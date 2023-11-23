CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    email VARCHAR(30) NOT NULL UNIQUE CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$'),
    password VARCHAR(100));

CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    shortCode VARCHAR(6) NOT NULL,
    link VARCHAR(1000) NOT NULL,
    user_id INTEGER FOREIGN KEY (user_id) users (id),
    calls INTEGER(255) NOT NULL DEFAULT '0');

     
   

