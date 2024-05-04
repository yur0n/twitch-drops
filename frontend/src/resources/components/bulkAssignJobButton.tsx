import { useCustomDataProvider } from "../../hooks/useDataProvider";
import { useState } from "react";
import {
  useGetList,
  useListContext,
  Button,
  useRefresh,
  useNotify,
  useUnselectAll,
  useTranslate,
} from "react-admin";
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

export default function BulkAssignJobButton() {
  const dataProvider = useCustomDataProvider();
  const translate = useTranslate();
  const refresh = useRefresh();
  const notify = useNotify();
  const unselectAll = useUnselectAll("bots");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [game, setGame] = useState("");
  const {
    data: botsData,
    selectedIds,
  }: { data: { id: string; token: string }[]; selectedIds: string[] } =
    useListContext();
  const bots = botsData
    .filter((bot) => selectedIds.includes(bot.id))
    .map((bot) => bot.token);
  const { data: gamesList } = useGetList("games", {
    pagination: { page: 1, perPage: 1000 },
  });
  const games = gamesList?.map((game: { name: string }) => game.name) ?? [];

  const addJob = async () => {
    if (!game || !name) return notify(translate("custom.errors.fillFields"));
    dataProvider
      .addJob("add-job", { bots, name, game, note })
      .then((res) => {
        notify(translate(`server.res.${res.status}`));
        if (res.ok) {
          setOpen(false);
          refresh();
          unselectAll();
        }
      })
      .catch((e) => {
        console.error(e);
        notify(translate("server.res.400"));
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button label="custom.action.createJob" onClick={handleClickOpen}>
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
          {translate("custom.labels.newJob")}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: 350 }}>
            <TextField
              label={translate("custom.labels.addName")}
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <Autocomplete
              id="auto-complete"
              options={games}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={translate("custom.labels.chooseGame")}
                />
              )}
              onChange={(event, value) => {
                setGame(value || "");
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
            label="custom.action.create"
            variant="contained"
            onClick={() => addJob()}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
