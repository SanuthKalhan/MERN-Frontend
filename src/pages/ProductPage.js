import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Container, Row, Col, Badge, ButtonGroup, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from '../component/Loading';
import SimilarProduct from '../component/SimilarProduct';
import "./ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from '../component/ToastMessage';

function ProductPage() {
    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);
    const [addToCart, { isSuccess }] = useAddToCartMutation();

    const handleDragStart = (e) => e.preventDefault();
    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            setProduct(data.product);
            setSimilar(data.similar);
        });
    }, [id]);

    if (!product) {
        return <Loading />;
    }
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const images = product.pictures.map((picture, index) => (
        <img
          key={index}
          className="product__carousel--image"
          src={picture.url}
          onDragStart={handleDragStart}
          width={700} 
          height={500} 
          alt={`Product ${index + 1}`}
        />
      ));
      

    let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className="item" data-value={idx}>
                <SimilarProduct {...product} />
            </div>
        ));
    }

    return (
        <Container className="product-container">
            <Row>
                <Col lg={6} className="product-carousel">
                    <AliceCarousel mouseTracking items={images} controlsStrategy="alternate" />
                </Col>
                <Col lg={6} className="product-details">
                    <h1 className="product-title">{product.name}</h1>
                    <p className="product-category">
                        <Badge bg="primary">{product.category}</Badge>
                    </p>
                    <p className="product-price">Rs{product.price}</p>
                    <p className="product-description">
                        <strong>Description:</strong> {product.description}
                    </p>
                    {user && !user.isAdmin && (
                        <ButtonGroup className="product-button-group">
                            <Form.Select size="lg" className="product-quantity-select">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                            <Button
                                size="lg"
                                className="product-add-to-cart-button"
                                onClick={() =>
                                    addToCart({
                                        userId: user._id,
                                        productId: id,
                                        price: product.price,
                                        image: product.pictures[0].url,
                                    })
                                }
                            >
                                Add to cart
                            </Button>
                        </ButtonGroup>
                    )}
                    {user && user.isAdmin && (
                        <LinkContainer to={`/product/${product._id}/edit`}>
                            <Button size="lg" className="product-edit-button">
                                Edit Product
                            </Button>
                        </LinkContainer>
                    )}
                    {isSuccess && <ToastMessage bg="info" title="Added to cart" body={`${product.name} is in your cart`} />}
                </Col>
            </Row>
            <div className="similar-products">
                <h2 className="similar-products-title">Similar Products</h2>
                <div className="similar-products-carousel">
                    <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternate" />
                </div>
            </div>
        </Container>

    );
}

export default ProductPage;