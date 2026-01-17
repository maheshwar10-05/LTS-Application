import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`}>
                <img src={product.image_url} alt={product.name} className="product-image" />
                <h4 style={{ margin: '10px 0', color: 'var(--secondary-color)', height: '40px', overflow: 'hidden' }}>
                    {product.name}
                </h4>
            </Link>
            <div className="price">${parseFloat(product.price).toFixed(2)}</div>
            <div className="actions" style={{ marginTop: '15px' }}>
                <button
                    onClick={() => addToCart(product.id)}
                    className="btn btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                >
                    <i className="fa fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
