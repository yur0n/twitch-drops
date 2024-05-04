import { useCustomDataProvider } from "../../hooks/useDataProvider";
import { DialogWindow } from "./addBotsBox";
import { useRefresh, useNotify, useTranslate } from "react-admin";

export default function AddBotsDialog() {
  const dataProvider = useCustomDataProvider();
  const translate = useTranslate();
  const refresh = useRefresh();
  const notify = useNotify();
  const addBots = async (botsString: string, setOpen: (v: boolean) => void) => {
    const bots = botsString
      .split("\n")
      .map((botInfo) => {
        if (botInfo === "") return;
        const bot = botInfo.split(":");
        if (bot.length !== 5) return;
        return {
          login: bot[0],
          password: bot[1],
          token: bot[2],
          email: bot[3],
          emailPassword: bot[4],
        };
      })
      .filter((bot) => bot !== undefined);

    if (!bots.length) return notify(translate("server.res.207"));

    dataProvider
      .addBots("add-bots", bots)
      .then((res) => {
        notify(translate(`server.res.${res.status}`));
        if (res.ok) {
          setOpen(false);
          refresh();
        }
      })
      .catch((e) => {
        console.error(e);
        notify(translate("server.res.400"));
      });
  };

  return <DialogWindow addBots={addBots} />;
}
