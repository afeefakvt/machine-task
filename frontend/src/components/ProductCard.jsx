import { Link } from 'react-router-dom';
import { FaHeart, FaStar } from 'react-icons/fa';
import '../styles/ProductCard.css'

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="card-link">
        <div className="image-wrapper">
          <img src={product.image} alt={product.title} />
          <FaHeart className="wishlist-icon" />
        </div>
        <div className="product-info">
          <h4 className="product-title">{product.title}</h4>
          <p className="product-desc">Your perfect pack for everyday use and walks in the forest...</p>
          <p className="product-price">₹ {product.price}</p>
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < 4 ? '#facc15' : '#e5e7eb'} size={14} />
            ))}
            <span className="review-count">(121)</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

