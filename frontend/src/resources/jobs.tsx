import {
  BooleanField,
  Datagrid,
  List,
  TextField,
  ReferenceManyCount,
  Show,
  TabbedShowLayout,
  ReferenceManyField,
} from "react-admin";
import BotDropsBox from "./components/botDropsBox";

export const JobList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="game" />
      <BooleanField source="status" />
      <ReferenceManyCount reference="bots" target="job" label="Working Bots" />
      <TextField source="note" />
    </Datagrid>
  </List>
);

export const JobShow = () => (
  <Show>
    <TabbedShowLayout>
      <TabbedShowLayout.Tab label="Job Progress">
        <BotDropsBox />
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="Working Bots">
        <ReferenceManyField reference="bots" target="job">
          <Datagrid rowClick="show">
            <TextField source="login" />
            <TextField source="password" />
            <TextField source="token" />
            <BooleanField source="active" />
            <TextField source="email" />
            <TextField source="emailPassword" />
          </Datagrid>
        </ReferenceManyField>
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="summary">
        <TextField source="name" />
        <TextField source="game" />
        <BooleanField source="status" />
        <ReferenceManyCount
          reference="bots"
          target="job"
          label="Working Bots"
        />
        <TextField source="note" />
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>
);
