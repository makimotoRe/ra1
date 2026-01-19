import { Datagrid, EmailField, List, TextField, TextInput } from "react-admin";

const filters = [
  <TextInput source="q" label="検索" alwaysOn />,
  <TextInput source="name" label="名前" />,
  <TextInput source="username" label="ユーザー名" />,
];

export const UserList = () => (
  <List filters={filters}>
    <Datagrid rowClick="show">
      <TextField source="id" label="ID" />
      <TextField source="name" label="名前" />
      <TextField source="username" label="ユーザー名" />
      <EmailField source="email" label="メール" />
      <TextField source="address.street" label="住所" />
      <TextField source="phone" label="電話番号" />
      <TextField source="website" label="ウェブサイト" />
      <TextField source="company.name" label="会社名" />
    </Datagrid>
  </List>
);
