import React, { useState } from "react";
import { Button, Menu, Typography, makeStyles } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import UnblurCardsButton from "./UnblurCardsButton";
import VoteCountButton from "./VoteCountButton";
import ExportBoardButton from "./ExportBoardButton";
import ExportTemplateButton from "./ExportTemplateButton";
import QrCodeButton from "./QrCodeButton";

const useStyles = makeStyles(() => ({
  settingsButton: {
    textTransform: "none",
    color: "white",
  },
}));

export default function SettingsButton() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleSettings = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="text"
        className={classes.settingsButton}
        aria-label="board settings"
        aria-controls="settings-appbar"
        aria-haspopup="true"
        onClick={handleSettings}
        startIcon={<SettingsIcon />}
      >
        <Typography>Settings</Typography>
      </Button>
      <Menu
        keepMounted
        id="settings-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <UnblurCardsButton />
        <VoteCountButton />
        <ExportBoardButton />
        <ExportTemplateButton />
        {/*<ContinueDiscussionButton />*/}
        <QrCodeButton />
      </Menu>
    </>
  );
}
