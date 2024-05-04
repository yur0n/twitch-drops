import { useState } from "react";
import { Button, useTranslate } from "react-admin";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const DialogWindow = ({
  addBots,
}: {
  addBots: (botsString: string, setOpen: (v: boolean) => void) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [botsString, setBotsString] = useState("");
  const translate = useTranslate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button label="custom.action.addBots" onClick={handleClickOpen}>
        <AddIcon />
      </Button>
      <Dialog
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">
          {translate("custom.action.addBots")}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label={translate("custom.labels.putBots")}
            variant="outlined"
            multiline
            rows={15}
            style={{ width: "900px" }}
            onChange={(e) => setBotsString(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            label="custom.action.cancel"
            variant="contained"
            onClick={handleClose}
          />
          <Button
            label="custom.action.add"
            variant="contained"
            onClick={() => addBots(botsString, setOpen)}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};
