import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/productApi';

const ProductDetail = () => {

   const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(()=>{
    const fetchProductDetails = async(id)=>{
        try {
            const res = await getProductById(id)  
            console.log(res,"djbjefkvbfjdkcm");       
            setProduct(res)
            setLoading(false)
        } catch (error) {
            setError(error.response?.data?.message || "Error fetching data");
            setLoading(false)
        }
    }
    fetchProductDetails(id)
  },[id]);

    if (loading) return <p>Loading product...</p>;
    if(error) return <p>Error:{error}</p>

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <div className="info">
        <h2>{product.title}</h2>
        <p className="price">₹ {product.price}</p>
        <p>{product.description}</p>
        <p className="category">Category: {product.category}</p>
      </div>
    </div>
  )
}

export default ProductDetail
