import jsonServerProvider from "ra-data-json-server";
import { DataProvider } from "ra-core";
const apiUrl: string = import.meta.env.VITE_JSON_SERVER_URL;
import { fetchUtils } from "react-admin";

interface ServerResponse {
  ok: boolean;
  status: number;
  data?: [];
}

interface Bot {
  login: string;
  password: string;
  token: string;
  email: string;
  emailPassword: string;
}

interface Job {
  bots: string[];
  name: string;
  game: string;
  note?: string;
}

export interface CustomDataProvider extends DataProvider {
  addBots: (resource: string, params: Bot[]) => Promise<ServerResponse>;
  addJob: (resource: string, params: Job) => Promise<ServerResponse>;
  getDrops: (resource: string, params: string) => Promise<ServerResponse>;
}

export const dataProvider: CustomDataProvider = {
  ...jsonServerProvider(apiUrl),
  addBots: async (resource, params) => {
    return fetchUtils
      .fetchJson(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify(params),
      })
      .then(({ json }) => json);
  },
  addJob: async (resource, params) => {
    return fetchUtils
      .fetchJson(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify(params),
      })
      .then(({ json }) => json);
  },
  getDrops: async (resource, params) => {
    return fetchUtils
      .fetchJson(`${apiUrl}/${resource}?token=${params}`)
      .then(({ json }) => json);
  },
};
