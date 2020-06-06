import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

import { PageNotFoundText, PageNotFoundContainer } from "./styled-components";

export default function ErrorPage() {
  return (
    <PageNotFoundContainer>
      <PageNotFoundText>Oh no, an error :(</PageNotFoundText>
      <Typography variant="body1">Possible reasons:</Typography>
      <ul>
        <li>
          <Typography variant="body1">Board ID is invalid</Typography>
        </li>
        <li>
          <Typography variant="body1">Board data is corrupted</Typography>
        </li>
      </ul>
      <Typography variant="body1">
        Please contact the responsible person for this app and describe the
        problem.
      </Typography>
      <hr />
      <Link to="/">Return to Homepage</Link>
    </PageNotFoundContainer>
  );
}
