const pool = require('../config/db');

const updateSchema = async () => {
    try {
        console.log('Attempting to update schema...');

        // Add columns if they don't exist
        const columns = ['address', 'city', 'state', 'country'];

        for (const col of columns) {
            await pool.query(`
          ALTER TABLE users 
          ADD COLUMN IF NOT EXISTS ${col} VARCHAR(100);
        `);
            console.log(`Ensured column '${col}' exists.`);
        }

        console.log('Schema update complete.');
    } catch (err) {
        console.error('Error updating schema:', err);
    } finally {
        pool.end();
    }
};

updateSchema();
