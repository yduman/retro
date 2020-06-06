import React, { useRef, useState } from "react";
import QRCode from "qrcode";
import QrCodeIcon from "@material-ui/icons/CropFree";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

export default function QrCodeButton() {
  const [open, setOpen] = useState(false);
  const qrCanvas = useRef<HTMLCanvasElement>(null);
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function onRendered() {
    QRCode.toCanvas(qrCanvas.current, window.location.href);
  }

  return (
    <React.Fragment>
      <MenuItem aria-label="QR Code" color="primary" onClick={openDialog}>
        <ListItemIcon>
          <QrCodeIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="QR Code" />
      </MenuItem>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        onRendered={onRendered}
        aria-labelledby="qr-code-dialog"
        aria-describedby="qr-code-dialog-description"
      >
        <DialogTitle id="qr-code-dialog">QR Code</DialogTitle>
        <DialogContent>
          <DialogContentText id="board-export-dialog-description">
            <canvas ref={qrCanvas} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
