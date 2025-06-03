import { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useProducts } from '../hooks/useProducts';
import type { ProductI } from '../types/product';

function ProductPage() {
  const { id: productId } = useParams();

  const { fetchProduct, loading, error } = useProducts();

  const [product, setProduct] = useState<ProductI>();

  // Keep track of the abort controller for this component's request
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    async function getProduct() {
      try {
        if (productId) {
          abortControllerRef.current = new AbortController();
          const data = await fetchProduct(
            productId,
            abortControllerRef.current.signal
          );
          setProduct(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getProduct();

    // Cleanup function to abort request if component unmounts
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [fetchProduct, productId]);

  if (!product)
    return (
      <>
        <Link to='/' className='btn btn-light my-3'>
          Go back
        </Link>
        <Row>
          <h3>Product not found</h3>
        </Row>
      </>
    );

  if (loading)
    return (
      <>
        <p>Loading Product Info...</p>
      </>
    );
  if (error)
    return (
      <>
        <p>{error}</p>
      </>
    );

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description ${product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProductPage;
