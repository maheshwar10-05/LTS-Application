import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';

const Category = () => {
    const { name } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const response = await productService.getAll(name);
                setProducts(response.data);
            } catch (error) {
                console.error('Error loading category products', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [name]);

    return (
        <div className="container">
            {/* Breadcrumb / Header */}
            <div style={{ margin: '20px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <h2 style={{ color: 'var(--secondary-color)', textTransform: 'uppercase' }}>
                    <span style={{ color: '#999', fontSize: '0.8em', marginRight: '10px' }}>Home &gt;</span>
                    {name}
                </h2>
            </div>

            {/* Categories Sub-Grid (Mock for Fragrance/Apparel based on analysis) */}
            {(name === 'Fragrance' || name === 'Apparel & accessories') && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                    {['Men', 'Women'].map(sub => (
                        <div key={sub} style={{ textAlign: 'center' }}>
                            <div style={{ background: '#eee', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fa fa-image" style={{ fontSize: '3em', color: '#ccc' }}></i>
                            </div>
                            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{sub}</p>
                        </div>
                    ))}
                </div>
            )}

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <>
                    {products.length === 0 ? (
                        <p>There are no products to list in this category.</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Category;
