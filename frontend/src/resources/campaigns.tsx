import {
  Datagrid,
  DateField,
  ReferenceField,
  TextField,
  InfiniteList,
} from "react-admin";
import { CustomPagination } from "./components/customPagination";

export const Campaigns = () => (
  <InfiniteList pagination={<CustomPagination />}>
    <Datagrid rowClick="edit">
      {/* <TextField source="id" /> */}
      <TextField source="name" />
      <ReferenceField source="gameId" reference="games" />
      <DateField
        source="start"
        showTime
        locales="en-GB"
        options={{ hour12: false }}
      />
      <DateField
        source="end"
        showTime
        locales="en-GB"
        options={{ hour12: false }}
      />
    </Datagrid>
  </InfiniteList>
);
