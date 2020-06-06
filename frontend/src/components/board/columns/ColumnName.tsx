import React from "react";

import { Typography } from "@material-ui/core";

type ColumNameProps = { columnTitle: string };

const ColumnName = ({ columnTitle }: ColumNameProps) => (
  <Typography variant="subtitle2">{columnTitle}</Typography>
);

export default ColumnName;
