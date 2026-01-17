import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/api';
import { CartContext } from '../context/CartContext';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await productService.getById(id);
                setProduct(response.data);
            } catch (error) {
                console.error('Error loading product', error);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '50px' }}>Loading...</div>;
    if (!product) return <div className="container" style={{ padding: '50px' }}>Product not found</div>;

    return (
        <div className="container">
            <div className="product-detail" style={{ display: 'flex', gap: '40px', padding: '40px 0' }}>
                <div style={{ flex: 1 }}>
                    <img src={product.image_url} alt={product.name} style={{ width: '100%', border: '1px solid #eee' }} />
                </div>
                <div style={{ flex: 1 }}>
                    <h1 style={{ color: '#333' }}>{product.name}</h1>
                    <hr style={{ border: 'none', borderBottom: '1px solid #eee', margin: '20px 0' }} />

                    <div className="price" style={{ fontSize: '2em', marginBottom: '20px' }}>
                        ${parseFloat(product.price).toFixed(2)}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                        <label>
                            Qty:
                            <input
                                type="number"
                                min="1"
                                value={qty}
                                onChange={(e) => setQty(parseInt(e.target.value))}
                                style={{ padding: '8px', width: '60px', marginLeft: '10px' }}
                            />
                        </label>
                        <button
                            onClick={() => addToCart(product.id, qty)}
                            className="btn btn-primary"
                            style={{ padding: '10px 30px' }}
                        >
                            <i className="fa fa-shopping-cart"></i> ADD TO CART
                        </button>
                    </div>

                    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '4px' }}>
                        <h3>Description</h3>
                        <p>
                            This is a replica product description for <strong>{product.name}</strong>.
                            It features high-quality ingredients and materials suited for your needs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
