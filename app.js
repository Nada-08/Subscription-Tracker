import express from 'express';

import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';


const app = express(); // creating an express app instance - actual web server

app.use('/api/v1/auth', authRouter); // use which api 
app.use('/api/v1/users', userRouter); 
app.use('/api/v1/subscriptions', subscriptionRouter); 


app.get('/', (req, res) => { // sets up a GET route
    res.send('Welcome to the Subscription Tracker API!');
});

app.listen(PORT, () => { // starts the server on port 3000
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
});

export default app; // exports it so it can be imported and used elsewhere