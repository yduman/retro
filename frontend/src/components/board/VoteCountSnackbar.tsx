import React, { useContext } from "react";
import { Snackbar } from "@material-ui/core";

import { UserContext } from "../../context/UserContext";

type VoteCountSnackbarProps = {
  id: string;
  open: boolean;
  handleClose: () => void;
  autoHideDuration: number;
};

export default function VoteCountSnackbar(props: VoteCountSnackbarProps) {
  const { id, open, handleClose, autoHideDuration } = props;
  const { userState } = useContext(UserContext);

  function closeSnackbar() {
    handleClose();
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={closeSnackbar}
      autoHideDuration={autoHideDuration}
      ContentProps={{
        "aria-describedby": id,
      }}
      message={
        <span id="vote-count-snackbar">
          You have {userState.votesLeft} votes left.
        </span>
      }
    />
  );
}
