import { Logout, useSidebarState } from "react-admin";
import MenuItem from "@mui/material/MenuItem";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {
  MenuProps,
  BasePopover as SettingMenu,
} from "../../../shared/components/Popover/BasePopover";
import { useDashboardState } from "../../../shared/hooks/useDashboardState";
import { useLocation } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { styled } from "@mui/material/styles";
import { authProvider } from "../../../auth/keycloakAuthProvider";

// Appbar内のSettingButton
export const DefaultSettingMenu = (props: MenuProps) => {
  const { setEditMode } = useDashboardState();
  const [open, setOpen] = useSidebarState();
  // const location = useLocation();

  //DefaultSettingMenuボタンクリックで編集モード Sidebarを閉じる
  const handleDashboard = () => {
    setEditMode();
    if (open) {
      setOpen(!open);
    }
  };

  return (
    <SettingMenu
      label="Setting"
      className="SettingMenu"
      icon={<SettingsIcon />}
      {...props}
    >
      <StyledMenuItems>
        <MenuItem>
          <PersonAddAlt1Icon className="personalAddIcon" />
          Add Manager
        </MenuItem>
        <MenuItem
          onClick={location.pathname === "/" ? handleDashboard : undefined}
        >
          <DashboardCustomizeIcon className="DashboardCustomize" />
          Customize Dashboard
        </MenuItem>
        {/* <MenuItem></MenuItem> */}
      </StyledMenuItems>
      <Logout onClick={() => authProvider.logout({})} />
    </SettingMenu>
  );
};

const StyledMenuItems = styled("div")(({ }) => ({
  "& .personalAddIcon": {
    marginLeft: "2.5px",
    fontSize: "1.5rem",
    marginRight: "6px",
  },
  "& .DashboardCustomize": {
    marginRight: "8px",
  },
}));
