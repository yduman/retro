import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

type MergeCardsDialogProps = {
  open: boolean;
  closeDialog: () => void;
  startMerge: () => void;
  stopMerge: () => void;
};

export default function MergeCardsDialog(props: MergeCardsDialogProps) {
  const { open, closeDialog, startMerge, stopMerge } = props;
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  function mergeCards() {
    startMerge();
    closeDialog();
  }

  function abortMerge() {
    stopMerge();
    closeDialog();
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-merge-card-dialog"
        aria-describedby="alert-merge-card-dialog-description"
      >
        <DialogTitle id="alert-merge-card-dialog">{"Merge Cards?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-merge-card-dialog-description">
            You are about to merge cards!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={abortMerge} color="primary">
            Cancel
          </Button>
          <Button onClick={mergeCards} color="primary" autoFocus>
            Merge
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
