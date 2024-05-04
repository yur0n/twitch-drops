import {
  Datagrid,
  DateField,
  List,
  TextField,
  ReferenceManyCount,
  Show,
  SimpleShowLayout,
  ReferenceManyField,
} from "react-admin";

export const GameList = () => (
  <List>
    <Datagrid rowClick="show">
      {/* <TextField source="id" /> */}
      <TextField source="name" />
      <ReferenceManyCount
        reference="campaigns"
        target="gameId"
        label="Drop Campaigns"
      />
      {/* <ReferenceManyCount
							reference="drops"
							target="gameId"
							label="Total Drops"
						/> */}
    </Datagrid>
  </List>
);

export const GameShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <ReferenceManyField reference="campaigns" target="gameId">
        <Datagrid>
          <TextField source="name" />
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
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);
