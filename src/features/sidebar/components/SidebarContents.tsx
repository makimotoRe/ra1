import React from "react";
import { useSidebarState } from "react-admin";

import { Tooltip } from "@mui/material";
import { styled } from "@mui/system";

import BaseSettingButton from "../../../shared/components/Button/BaseSettingButton";
import { DefaultMenu } from "../../resource/components/DefaultMenu";

// SidebarのスタイルおよびMenu以外のボタンの追加
const CustomSidebarContents: React.FC = () => {
  const [open, setOpen] = useSidebarState();
  return (
    <SidebarContentsStyle>
      <div className="custom-sidebar-content">
        <DefaultMenu />
      </div>
      <div className="custom-setting">
        {!open ? (
          <Tooltip
            title="setting"
            placement="right"
            PopperProps={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -210],
                  },
                },
              ],
            }}
          >
            <div>
              <BaseSettingButton />
            </div>
          </Tooltip>
        ) : (
          <BaseSettingButton />
        )}
      </div>
    </SidebarContentsStyle>
  );
};

export default CustomSidebarContents;

const SidebarContentsStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  "& .custom-button": {
    border: "none",
    outline: "none",
    paddingBottom: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    paddingRight: theme.spacing(15),
  },
  "& .custom-button:hover": {
    border: "none",
    outline: "none",
  },
  "& .custom-setting": {
    position: "fixed",
    left: 0,
    bottom: 0,
  },
  "& .icon": {
    marginRight: theme.spacing(1),
  },
  "& .setting": {
    marginLeft: theme.spacing(1),
    fontSize: "1.0rem",
  },
  [theme.breakpoints.down("sm")]: {
    "& .tooltip-wrapper": {
      display: "none",
    },
  },
}));
