import { Login } from "react-admin";

import { styled } from "@mui/material/styles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation } from "react-router-dom";
import "../../../layout/style/layout.css";

import AdminLoginForm from "../components/AdminLoginForm";
import { generateTrianglifyBackground as loginBackgroundImg } from "../sources/generateTrianglifyBackground";
import PureLoginForm from "../components/PureLoginForm";

// 管理用ログインページ
const AdminLoginPage = ({ children = <PureLoginForm/> }) => {
  const location = useLocation();
  return (
    <>
      <LoginStyled
        children={children}
        backgroundImage={loginBackgroundImg()}
        className="loginstyle"
      />
    </>
  );
};
export default AdminLoginPage;

const LoginStyled = styled(Login)(({ theme }) => ({
  backgroundColor: "white",
  maxHeight: 50,
  justifyContent: "center",
  " &.loginstyle": {
    "& .MuiCard-root": {
      backgroundColor: "rgba(255, 255, 255, 0)",
      boxShadow: "none",
      marginTop: -100,
    },

    "& .RaLogin-icon": {
      display: "none" /* 既存のアイコンを非表示にする */,
    },
    "& .MuiButton-root.RaLoginForm-button": {
      backgroundColor: "#9b6fdd" /* 紫がかった色 */,
      border: "none",
      background:
        "linear-gradient(to bottom, #9b6fdd 0%, #6f47dd 100%)" /* 標準のグラデーション */,
    },
    "& .MuiOutlinedInput-root": {
      color: "black",
      backgroundColor: "white",
    },
    "& .MuiTextField-root": {
      width: "100%",
    },
  },
}));
