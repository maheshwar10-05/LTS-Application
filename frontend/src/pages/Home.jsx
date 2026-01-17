import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFeatured = async () => {
            try {
                const response = await productService.getFeatured();
                setFeatured(response.data);
            } catch (error) {
                console.error('Error loading featured products', error);
            } finally {
                setLoading(false);
            }
        };
        loadFeatured();
    }, []);

    return (
        <div className="home-page">
            {/* Hero Slider Placeholder */}
            <div className="hero-slider" style={{ background: '#eee', padding: '60px 0', textAlign: 'center', marginBottom: '30px' }}>
                <div className="container">
                    <h1 style={{ color: 'var(--secondary-color)', fontSize: '2.5em' }}>Welcome to Automation Test Store</h1>
                    <p>Your one stop shop for all things automation testing!</p>
                    <div style={{ marginTop: '20px' }}>
                        <Link to="/lts/login" style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: 'var(--primary-color)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold'
                        }}>
                            Go to LTS Application
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container">
                <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
                    <span style={{ borderBottom: '3px solid var(--primary-color)', paddingBottom: '10px' }}>Featured</span>
                </h2>

                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                        {featured.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        {featured.length === 0 && <p>No featured products found.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
