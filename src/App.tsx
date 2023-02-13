import { Col, Container, Row } from "react-bootstrap";
import { ActionView } from "./components/ActionView";

export const App = () => {
  return (
    <Container>
      <Row>
        <Col xs={6} as="aside">
          <ActionView></ActionView>
        </Col>

        <Col xs={6} as="aside"></Col>
      </Row>
    </Container>
  );
};
