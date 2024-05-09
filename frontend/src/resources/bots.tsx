import {
  BooleanField,
  Datagrid,
  TextField,
  Show,
  BulkDeleteButton,
  ExportButton,
  TopToolbar,
  InfiniteList,
  ReferenceField,
  TabbedShowLayout,
} from "react-admin";
import BulkAssignJobButton from "./components/bulkAssignJobButton";
import AddBotsDialogButton from "./components/addBotsButton";
import { CustomPagination } from "./components/customPagination";
import BotDropsBox from "./components/botDropsBox";

const BotListActionButtons = () => (
  <>
    <BulkAssignJobButton />
    <BulkDeleteButton />
  </>
);

const ListActions = () => (
  <TopToolbar>
    <AddBotsDialogButton />
    {/* <CreateButton/> */}
    <ExportButton />
  </TopToolbar>
);

export const BotList = () => (
  <InfiniteList pagination={<CustomPagination />} actions={<ListActions />} >
    <Datagrid rowClick="show" bulkActionButtons={<BotListActionButtons />} >
      {/* <TextField source="id" /> */}
      <TextField source="login" />
      <TextField source="password" />
      <TextField source="token" />
      <BooleanField source="active" />
      <ReferenceField source="job" reference="jobs" link="show" />
      <TextField source="email" />
      <TextField source="emailPassword" />
    </Datagrid>
  </InfiniteList>
);

export const BotShow = () => (
  <Show>
    <TabbedShowLayout>
      <TabbedShowLayout.Tab label="Job Progress">
        <BotDropsBox />
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="summary">
        <TextField source="login" />
        <TextField source="password" />
        <TextField source="token" />
        <BooleanField source="active" />
        <ReferenceField source="job" reference="jobs" link="show" />
        <TextField source="email" />
        <TextField source="emailPassword" />
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>
);
