import { useDataProvider } from "react-admin";
import { CustomDataProvider } from "../providers/dataProvider";

export const useCustomDataProvider = (): CustomDataProvider => {
  const dataProvider = useDataProvider();
  return dataProvider as CustomDataProvider;
};
