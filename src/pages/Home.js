import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import categories from './categories'; 
import { Col, Row } from 'react-bootstrap';
import ProductPreview from '../component/ProductPreview';
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from '../features/productSlice';

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  useEffect(() => {
    axios
      .get("/products")
      .then(({ data }) => dispatch(updateProducts(data)))
      .catch((error) => {
        // Handle the error (e.g., display an error message or log it)
        console.error("Error fetching data:", error);
      });
  }, []);
  
  return (
    <div>
      <img src='/Group 1.png' className='home--banner' />
      <div className='featured-product-continer container mt-4'>
        <h2>Recent Products</h2>
        {/* Add the rest of your featured products content */}
        <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview {...product} />
                    ))}
                </div>
      </div> 

      <div className='text-right'>
        <Link to="/category/all" style={{ textDecoration: "none" }}>
          See more &gt;&gt;
        </Link>
      </div>

      <div className='sale_banner--container mt-4'>
        <img
          src='/fresh-vegetable-facebook-social-media-cover-design-template-premium-vector_530246-113.jpg'
          alt='Sale Banner'
          className='second--banner'
        />
      </div>
      <div className='recent-products-container container mt-4'>
        <h2 className='recent-products-container-title'>Categories</h2>
        <Row>
        {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLowerCase()}`} 
              key={category.name} 
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className='category-title'
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;

