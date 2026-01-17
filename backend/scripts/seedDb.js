const pool = require('../config/db');
const bcryptjs = require('bcryptjs');

const seedDatabase = async () => {
    try {
        // Users
        const hashedPassword = await bcryptjs.hash('password123', 10);
        await pool.query(`
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ('Test', 'User', 'test@example.com', '${hashedPassword}')
      ON CONFLICT (email) DO NOTHING;
    `);

        // Categories
        const categories = [
            'Home',
            'Apparel & accessories',
            'Makeup',
            'Skincare',
            'Fragrance',
            'Men',
            'Hair Care',
            'Books'
        ];

        for (const cat of categories) {
            await pool.query(`
        INSERT INTO categories (name) VALUES ($1)
        ON CONFLICT (name) DO NOTHING;
      `, [cat]);
        }

        // Get Category IDs
        const catRes = await pool.query('SELECT id, name FROM categories');
        const catMap = {};
        catRes.rows.forEach(r => catMap[r.name] = r.id);

        // Products (Real data from analysis)
        const products = [
            // Makeup
            {
                name: 'Skinsheen Bronzer Stick',
                price: 29.50,
                category: 'Makeup',
                image_url: 'https://automationteststore.com/image/cache/data/product_images/benefit_girl_meets_pearl-180x180.jpg',
                is_featured: true
            },
            {
                name: 'BeneFit Girl Meets Pearl',
                price: 28.00,
                category: 'Makeup',
                image_url: 'https://automationteststore.com/image/cache/data/product_images/benefit_girl_meets_pearl-180x180.jpg',
                is_featured: true
            },
            // Skincare
            {
                name: 'Absolue Eye Precious Cells',
                price: 105.00,
                category: 'Skincare',
                image_url: 'https://automationteststore.com/image/cache/data/product_images/product_1-180x180.jpg',
                is_featured: true
            },
            // Fragrance
            {
                name: 'Acqua Di Gio Pour Homme',
                price: 80.00,
                category: 'Fragrance',
                image_url: 'https://automationteststore.com/image/cache/data/product_images/product_2-180x180.jpg',
                is_featured: true
            },
            {
                name: 'Man Eau de Toilette Spray',
                price: 92.00,
                category: 'Fragrance',
                image_url: 'https://automationteststore.com/image/cache/data/product_images/product_3-180x180.jpg',
                is_featured: true
            },
            {
                name: 'Omnia',
                price: 62.00,
                category: 'Fragrance',
                image_url: 'https://automationteststore.com/image/cache/data/product_images/product_4-180x180.jpg',
                is_featured: true
            },
            // Apparel
            {
                name: 'T-Shirt',
                price: 15.00,
                category: 'Apparel & accessories',
                image_url: 'https://automationteststore.com/image/cache/data/product_images/tshirt-180x180.jpg', // Placeholder logic
                is_featured: false
            },
            {
                name: 'Shoes',
                price: 55.00,
                category: 'Apparel & accessories',
                image_url: 'https://automationteststore.com/image/cache/data/product_images/shoes-180x180.jpg', // Placeholder logic
                is_featured: false
            }
        ];

        // Clear existing products to avoid duplicates during re-seed
        // Must clear dependent tables first to avoid foreign key violations
        await pool.query('DELETE FROM order_items');
        await pool.query('DELETE FROM cart_items');
        await pool.query('DELETE FROM products');

        for (const p of products) {
            if (catMap[p.category]) {
                await pool.query(`
          INSERT INTO products (name, price, category_id, image_url, is_featured)
          VALUES ($1, $2, $3, $4, $5)
        `, [p.name, p.price, catMap[p.category], p.image_url, p.is_featured]);
            }
        }

        console.log('Database re-seeded successfully with updated data');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        pool.end();
    }
};

seedDatabase();
