import { Admin, Resource, houseLightTheme, houseDarkTheme } from "react-admin";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { i18nProvider } from "./providers/i18nProvider";

import { GameList, GameShow } from "./resources/games";
import { Campaigns } from "./resources/campaigns";
import { BotList, BotShow } from "./resources/bots";
import { JobList, JobShow } from "./resources/jobs";

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    theme={houseLightTheme}
    darkTheme={houseDarkTheme}
  >
    <Resource
      name="games"
      list={GameList}
      show={GameShow}
      recordRepresentation="name"
    />
    <Resource name="campaigns" list={Campaigns} recordRepresentation="name" />
    <Resource
      name="bots"
      list={BotList}
      show={BotShow}
      recordRepresentation="login"
    />
    <Resource
      name="jobs"
      list={JobList}
      show={JobShow}
      recordRepresentation="name"
    />
  </Admin>
);
