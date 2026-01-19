import { useMediaQuery, Theme } from "@mui/material";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  EmailField,
  UrlField,
} from "react-admin";
// import MyUrlField from "./garbage/MyUrlField";

export const UserList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid
          sx={{
            "& .RaDatagrid-headerCell": {
              borderBottom: "2px solid #ccc", // ヘッダーの横線を強調
              borderRight: "1px solid #ccc", // ヘッダーの縦線
            },
            "& .RaDatagrid-cell": {
              borderBottom: "1px solid #ccc", // 横線
              borderRight: "1px solid #ccc", // 縦線
            },
            "& .RaDatagrid-cell:last-child": {
              borderRight: "none", // 最後のセルには縦線を入れない
            },
          }}
        >
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="username" />
          <EmailField source="email" />
          <TextField source="address.street" />
          <UrlField source="website" />
          <TextField source="company.name" />
        </Datagrid>
      )}
    </List>
  );
};
