// CustomLayout.tsx
import { ReactNode } from "react";
import { CheckForApplicationUpdate, Layout, useTheme } from "react-admin";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation } from "react-router-dom";
import "./style/layout.css";

import { styled } from "@mui/material/styles";

import DefaultSidebar from "../features/sidebar/components/DefaultSidebar";
import DefaultAppbar from "../features/appbar/components/DefaultAppbar";
import { ProfileProvider } from "../features/profileEdit/pages/ProfileEdit";

// 全体のレイアウト
const DefaultLayout = ({ children }: { children?: ReactNode }) => {
  const [theme, setTheme] = useTheme();
  // const location = useLocation();
  return (
    <ProfileProvider>
      <LayoutStyled
        appBar={DefaultAppbar}
        sidebar={DefaultSidebar}
        className={theme == "light" ? "light-mode" : "dark-mode"}
      >
        <TransitionGroup>
          <CSSTransition
            // key={location.key}
            classNames="fade-enter"
            timeout={{ enter: 100000000 }}
          >
            {children}
          </CSSTransition>
        </TransitionGroup>
        {/* <ReactQueryDevtools /> */}
        <CheckForApplicationUpdate />
      </LayoutStyled>
    </ProfileProvider>
  );
};

export default DefaultLayout;

// rootのCSSの変更
const LayoutStyled = styled(Layout)(({ theme }) => ({
  "&.light-mode .RaLayout-content": {
    background: "#f8f8fb",
  },
  "&.dark-mode .RaLayout-content": {
    background: "#1a1624",
  },
  "& .MuiDrawer-root": {
    height: "90vh",
  },
}));
