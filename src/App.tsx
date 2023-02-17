import { Col, Container, Row } from "react-bootstrap";

import { ActionForm, ActionView } from "@components";

export const App = () => {
  return (
    <Container>
      <Row>
        <Col xs={6} as="aside">
          <ActionView />
        </Col>

        <Col xs={6} as="aside">
          <ActionForm />
        </Col>
      </Row>
    </Container>
  );
};
