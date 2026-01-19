import { UserMenu, useAuthProvider, Logout, UserMenuProps } from "react-admin";
// import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { BaseAvatar } from "../../../shared/components/Avatar/BaseAvatar";

// userMenu画面(logout +alpha)
export const DefaultUserMenu = (props: UserMenuProps) => {
  const authProvider = useAuthProvider();
  // const navigate = useNavigate();

  // const handleButtonClick = () => {
  //   navigate("/profile-edit"); // 遷移先のパスを指定
  // };

  return (
    <></>
    // <UserMenu {...props} icon={<BaseAvatar />}>
    //   <MenuItem onClick={handleButtonClick}>
    //     <AccountBoxIcon style={{ fontSize: "1.25rem", marginRight: "15px" }} />
    //     My Profile
    //   </MenuItem>
    //   {!!authProvider && <Logout />}
    // </UserMenu>
  );
};
