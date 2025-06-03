import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useProducts } from '../hooks/useProducts';

export default function HomePage() {
  const { products, loading, error } = useProducts();

  if (loading) {
    <Row>
      <p>Loading Product Data...</p>
    </Row>;
  }
  if (!error) {
    <Row>
      <p>{error}</p>
    </Row>;
  }
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} key={product._id} />
          </Col>
        ))}
      </Row>
    </>
  );
}
