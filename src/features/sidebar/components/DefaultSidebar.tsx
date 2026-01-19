import { Sidebar, SidebarProps } from "react-admin";
import { JSX } from "react/jsx-runtime";

import SidebarContents from "./SidebarContents";

// Sidebar
const DefaultSidebar = (props: JSX.IntrinsicAttributes & SidebarProps) => {
  return (
    <Sidebar {...props}>
      <SidebarContents />
    </Sidebar>
  );
};

export default DefaultSidebar;
