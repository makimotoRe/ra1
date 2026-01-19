import { Menu } from "react-admin";
{
  /* PLOP_INJECT_ICON_IMPORT */
}
import LabelIcon from "@mui/icons-material/Label";

// Sidebarに表示するリスト
export const DefaultMenu = () => (
  //TODO
  <Menu>
    <Menu.DashboardItem />
    <Menu.ResourceItem name="posts" />
    <Menu.ResourceItem name="users" />
    {/* PLOP_INJECT_MENU */}
    {/* @ts-ignore */}
    <Menu.Item to="/sample" primaryText="Sample" leftIcon={<LabelIcon />} />
  </Menu>
);
