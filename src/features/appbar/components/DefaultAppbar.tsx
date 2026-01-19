import { AppBar, AppBarProps, TitlePortal, useTheme } from "react-admin";
import { JSX } from "react/jsx-runtime";

import { styled } from "@mui/material/styles";

import { DefaultUserMenu } from "./DefaultUserMenu";
import { DefaultToolbar } from "./DefaultToolbar";

//DefaultAppBar
const DefaultAppbar = (props: JSX.IntrinsicAttributes & AppBarProps) => {
  const [theme, setTheme] = useTheme();

  return (
    <AppBarStyled
      toolbar={defaultToolbarElement}
      userMenu={defaultUserMenuElement}
      style={{ background: "#eaeaf1" }}
      className={theme == "light" ? "light-mode" : "dark-mode"}
    >
      <TitlePortal style={{ color: "#500050" }} />
    </AppBarStyled>
  );
};

const defaultUserMenuElement = <DefaultUserMenu />;
const defaultToolbarElement = <DefaultToolbar />;
export default DefaultAppbar;

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  "& .RaSidebarToggleButton-menuButtonIconOpen": {
    transform: "rotate(0deg) !important",
  },
  "& .RaSidebarToggleButton-menuButtonIconClosed": {
    transform: "rotate(90deg) !important",
  },
  "&.dark-mode": {
    backgroundImage: "none !important",
    backgroundColor: "#0d0a18 !important",
    boxShadow: "0px 0px 20px 0px rgba(138, 135, 135, 0.5) !important",
  },
  "&.dark-mode .typography": {
    color: "#d23f77 !important",
  },
}));
