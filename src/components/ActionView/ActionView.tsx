import { FC } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Yaml } from "@utils/Yaml";

import { ActionViewProps } from "./ActionView.props";
import { getJson } from "./redux/selector";

/*
permissions:
  contents: read

  pull-requests: read
concurrency:
  group: '${{ github.workflow }}@${{ github.event.pull_request.head.label || github.head_ref || github.ref }}'
  cancel-in-progress: true
*/

export const ActionView: FC<ActionViewProps> = () => {
  const ghAction = useSelector(getJson);
  const yml = Yaml.parse(ghAction);

  return (
    <Container className="bg-dark text-white">
      <pre>{yml}</pre>
    </Container>
  );
};
