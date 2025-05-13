import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import connectToPostgres from './postgres.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDatebase() {
  const client = await connectToPostgres.connect();

  try {
    await client.query('BEGIN');

    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf-8');
    
    // Split the SQL file into individual statements
    // This regex splits on semicolons followed by newlines or whitespace
    // but preserves semicolons inside function definitions
    const statements = splitSqlStatements(schemaSQL);
    
    // Execute each statement separately
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await client.query(statement);
        } catch (err) {
          console.error('Error executing statement:', err);
          console.error('Failed statement:', statement);
          throw err; // Re-throw to trigger rollback
        }
      }
    }
    
    await client.query('COMMIT');
    console.log('Database initialized successfully');

  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error initializing database: ', error);
    process.exit(1);
  } finally {
    client.release();
  }
}

// Function to properly split SQL statements, handling function definitions
function splitSqlStatements(sqlScript) {
  // State variables to track if we're inside a function definition
  let insideFunction = false;
  let statements = [];
  let currentStatement = '';
  
  // Split the script into lines for processing
  const lines = sqlScript.split('\n');
  
  for (const line of lines) {
    // Check if we're entering a function definition
    if (line.includes('CREATE OR REPLACE FUNCTION') || line.includes('CREATE FUNCTION')) {
      insideFunction = true;
    }
    
    // Add the current line to our statement buffer
    currentStatement += line + '\n';
    
    // Check if we're exiting a function definition
    if (insideFunction && line.includes('LANGUAGE') && line.includes(';')) {
      insideFunction = false;
    }
    
    // If we encounter a semicolon and we're not inside a function definition,
    // we've reached the end of a statement
    if (!insideFunction && line.trim().endsWith(';')) {
      statements.push(currentStatement);
      currentStatement = '';
    }
  }
  
  // Add any remaining statement
  if (currentStatement.trim()) {
    statements.push(currentStatement);
  }
  
  return statements;
}

initDatebase();