
-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, -- SERIAL automatically increments the id providing a unique one

    name varchar(50) NOT NULL CHECK (char_length(name) >= 2),

    email varchar(100) NOT NULL UNIQUE CHECK(
        email ~ '^\\S+@\\S+\\.\\S+$'
    ),

    password TEXT NOT NULL CHECK(char_length(password) >= 6), -- TEXT has no length limit unlike varchar

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ENUM types for currency, frequency, category, status
-- Needed for Subscription Table
CREATE TYPE currency AS ENUM('USD', 'EUR', 'EGP');
CREATE TYPE frequency AS ENUM('daily', 'weekly', 'monthly', 'yearly');
CREATE TYPE category AS ENUM('sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other');
CREATE TYPE status AS ENUM('active', 'expired', 'cancelled');


-- SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS subscriptions(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name varchar(100) NOT NULL CHECK (char_length(name) >= 2),
    price NUMERIC(10, 2) NOT NULL, -- up to 10 digits, up to 2 decimal places 
    currency currency DEFAULT 'EGP',
    frequency frequency, 
    category category NOT NULL, 
    payment_method varchar(100) NOT NULL,
    status status DEFAULT 'active',
    start_date DATE NOT NULL CHECK (start_date <= CURRENT_DATE), 
    renewal_date DATE, 
    CONSTRAINT valid_renewal_date CHECK (renewal_date > start_date),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Create index on user_id for performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id
ON subscriptions(user_id);

-- Function to calculate the renewal date based on start_date and frequency
CREATE OR REPLACE FUNCTION calculate_renewal_date(start_date DATE, frequency frequency)
RETURNS DATE AS $$ 
BEGIN 
    IF frequency = 'monthly' THEN
        RETURN start_date + INTERVAL '1 month';
    ELSIF frequency = 'yearly' THEN
        RETURN start_date + INTERVAL '1 year';
    ELSIF frequency = 'weekly' THEN
        RETURN start_date + INTERVAL '1 week';
    ELSIF frequency = 'daily' THEN
        RETURN start_date + INTERVAL '1 day';
    ELSE
        RETURN NULL;
    END IF;
END;
$$ LANGUAGE plpgsql;


-- Trigger function to automatically set the renewal_date
-- when a new subscription is inserted or updated
CREATE OR REPLACE FUNCTION set_renewal_date()
RETURNS TRIGGER AS $$
BEGIN 
    NEW.renewal_date = calculate_renewal_date(NEW.start_date, NEW.frequency);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


Trigger to call the set_renewal_date function automatically
before inserting or updating a row in the subscriptions table
CREATE TRIGGER trigger_set_renewal_date
BEFORE INSERT OR UPDATE ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION set_renewal_date()

CREATE OR REPLACE FUNCTION set_status()
RETURNS TRIGGER AS $$
BEGIN   
    IF (NEW.renewal_date < CURRENT_DATE) THEN
        NEW.status := 'expired';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_set_status
BEFORE INSERT OR UPDATE ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION set_status();