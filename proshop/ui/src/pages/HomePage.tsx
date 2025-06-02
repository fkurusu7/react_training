import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import products from './../data/products';

export default function HomePage() {
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
