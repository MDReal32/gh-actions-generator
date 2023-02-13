import { FC } from "react";
import { Container } from "react-bootstrap";

import { ActionViewProps } from "./ActionView.props";
import { GHAction } from "../../types/GHAction";
import { Yaml } from "../../utils/Yaml";

const actions: GHAction = {
  name: "Link Checker: All English",
  on: {
    push: {
      branches: ["master"]
    },
    pull_request: null
  }
};

/*
on:
  push:
    branches:
      - main
  pull_request:

permissions:
  contents: read

  pull-requests: read
concurrency:
  group: '${{ github.workflow }}@${{ github.event.pull_request.head.label || github.head_ref || github.ref }}'
  cancel-in-progress: true

jobs:
  check-links:
    runs-on: ${{ fromJSON('["ubuntu-latest", "self-hosted"]')[github.repository == 'github/docs-internal'] }}
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup node
        uses: actions/setup-node@v3
        with:
          node-version: 16.13.x
          cache: npm

      - name: Install
        run: npm ci


      - name: Gather files changed
        uses: trilom/file-changes-action@a6ca26c14274c33b15e6499323aac178af06ad4b
        with:
          fileOutput: 'json'


      - name: Show files changed
        run: cat $HOME/files.json

      - name: Link check (warnings, changed files)
        run: |
          ./script/rendered-content-link-checker.mjs \
            --language en \
            --max 100 \
            --check-anchors \
            --check-images \
            --verbose \
            --list $HOME/files.json

      - name: Link check (critical, all files)
        run: |
          ./script/rendered-content-link-checker.mjs \
            --language en \
            --exit \
            --verbose \
            --check-images \
            --level critical*/

export const ActionView: FC<ActionViewProps> = () => {
  const ghAction = actions;
  const yml = Yaml.parse(ghAction);

  return (
    <Container className="bg-dark text-white">
      <pre>{yml}</pre>
    </Container>
  );
};
