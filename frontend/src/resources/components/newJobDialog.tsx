import { useState } from "react";
import { Button, useTranslate, useListContext, useGetList } from "react-admin";
import {
  Stack,
  Autocomplete,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

export const NewJobDialog = ({
  addJob,
}: {
  addJob: (
    data: { bots: string[]; game: string; note?: string },
    setOpen: (v: boolean) => void
  ) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [game, setGame] = useState("");
  const translate = useTranslate();
  const { selectedIds: bots } = useListContext();
  const { data: gamesList } = useGetList("games", {
    pagination: { page: 1, perPage: 1000 },
  });
  const games = gamesList ? gamesList.map((game: any) => game.name) : [];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button label="custom.action.assignBots" onClick={handleClickOpen}>
        <WorkIcon />
      </Button>
      <Dialog
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">
          {translate("custom.action.assignBots")}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: 350 }}>
            <Autocomplete
              id="combo-box-demo"
              options={games}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={translate("custom.labels.chooseGame")}
                />
              )}
              onChange={(event, value) => {
                setGame(value);
              }}
            />
            <TextField
              label={translate("custom.labels.addNote")}
              id="outlined-basic"
              variant="outlined"
              multiline
              rows={2}
              onChange={(e) => setNote(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            label="custom.action.cancel"
            variant="contained"
            onClick={handleClose}
          />
          <Button
            label="custom.action.assign"
            variant="contained"
            onClick={() => addJob({ bots, game, note }, setOpen)}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};
