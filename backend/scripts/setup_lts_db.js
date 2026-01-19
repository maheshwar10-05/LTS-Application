const pool = require('../config/db');

const createTables = async () => {
    try {
        console.log('Creating LTS tables...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS lts_borrowers (
                id SERIAL PRIMARY KEY,
                uen VARCHAR(50) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                prospect VARCHAR(10) DEFAULT 'N',
                connection VARCHAR(50) DEFAULT 'Existing',
                tin VARCHAR(50),
                address VARCHAR(255),
                rrt VARCHAR(10) DEFAULT '+',
                arrow VARCHAR(10) DEFAULT 'v',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('lts_borrowers table created/verified.');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS lts_deals (
                id SERIAL PRIMARY KEY,
                deal_id VARCHAR(50) UNIQUE NOT NULL,
                borrower_id INTEGER REFERENCES lts_borrowers(id),
                transaction_summary VARCHAR(255),
                status VARCHAR(50),
                new_business BOOLEAN DEFAULT FALSE,
                purpose_of_request VARCHAR(100),
                currency VARCHAR(10) DEFAULT 'CAD',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('lts_deals table created/verified.');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS lts_favorites (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                borrower_id INTEGER REFERENCES lts_borrowers(id),
                UNIQUE(user_id, borrower_id)
            );
        `);
        console.log('lts_favorites table created/verified.');

        console.log('All LTS tables setup complete.');
        process.exit(0);
    } catch (err) {
        console.error('Error setting up LTS tables:', err);
        process.exit(1);
    }
};

createTables();
