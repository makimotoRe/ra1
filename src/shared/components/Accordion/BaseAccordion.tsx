import { ReactNode, useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

/**
 * Component : BaseAccordion
 * role      : アコーディオン(muiにも存在する)
 * @param {"bottomToTop"|"leftToRight"} direction どの方向に開閉するか
 */

// Accordion
export const BaseAccordion: React.FC<BaseAccordionProps> = ({
  children,
  direction = "bottomToTop",
}) => {
  const [isOpen, setIsOpen] = useState(true);

  //編集画面のドロワー
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const DrawersComponent =
    direction === "bottomToTop"
      ? BottomToTopDrawers
      : direction === "leftToRight"
      ? LeftToRightDrawers
      : TopToBottomDrawers; // デフォルトは上から下

  const ToggleIcon =
    direction === "bottomToTop" ? (
      <TopToBottomToggleIcon isOpen={isOpen} isReversed={false} />
    ) : direction === "leftToRight" ? (
      <TopToBottomToggleIcon isOpen={isOpen} isReversed={true} />
    ) : (
      <TopToBottomToggleIcon isOpen={isOpen} isReversed={true} />
    );

  return (
    <>
      <ToggleButton
        onClick={toggleDrawer}
        isOpen={isOpen}
        className="toggleButton"
      >
        {ToggleIcon}
      </ToggleButton>
      <DrawersComponent isOpen={isOpen}>
        <div className="flexDiv">{children}</div>
      </DrawersComponent>
    </>
  );
};

interface BaseAccordionProps {
  children: ReactNode;
  direction?: string;
}

interface ToggleIconProps {
  isOpen: boolean;
  isReversed?: boolean;
}
//移動方向に沿うように変化するiconコンポーネント
const TopToBottomToggleIcon: React.FC<ToggleIconProps> = ({
  isOpen,
  isReversed = false,
}) => {
  if (isReversed) {
    return isOpen ? (
      <KeyboardDoubleArrowUpIcon className="toggleIcon" />
    ) : (
      <KeyboardDoubleArrowDownIcon className="toggleIcon" />
    );
  } else {
    return isOpen ? (
      <KeyboardDoubleArrowDownIcon className="toggleIcon" />
    ) : (
      <KeyboardDoubleArrowUpIcon className="toggleIcon" />
    );
  }
};

// Buttonsのスタイルを定義
const ToggleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>(({ isOpen }) => ({
  marginLeft: "55px",
  paddingRight: "55px",
  width: "100%",
  position: "fixed",
  bottom: isOpen ? "100px" : "0px", // Drawerの高さに応じて位置を調整
  left: "50%",
  transform: "translateX(-50%)",
  background: "transparent",
  zIndex: 2,
  border: "none",
  transition: "bottom 0.5s ease-in-out",
  "&.toggleButton": {
    height: "18px",
    border: "none",
  },
  "& .toggleIcon": {
    position: "absolute",
    fontSize: "18px",
    bottom: 0,
  },
}));

const CommonToggleButton = styled(Button)({
  marginLeft: "55px",
  paddingRight: "55px",
  width: "100%",
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  background: "transparent",
  zIndex: 2,
  border: "none",
  transition: "bottom 0.5s ease-in-out",
  "&.toggleButton": {
    height: "18px",
    border: "none",
  },
  "& .toggleIcon": {
    position: "absolute",
    fontSize: "18px",
    bottom: 0,
  },
});

// Buttonsのスタイルを定義
const TopToBottomToggleButton = styled(CommonToggleButton, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>(({ isOpen }) => ({
  top: isOpen ? "148px" : "48px", // Drawerの高さに応じて位置を調整
}));

//Drawerの共通部分
const CommonDrawers = styled("div")({
  position: "fixed",
  backgroundColor: "rgba(128, 128, 128, 0.5)", // Boxの背景色を統合
  transition: "all 0.5s ease-in-out",
  zIndex: 1,
  display: "flex", // 常に flex を使う
  justifyContent: "space-between",
  alignItems: "flex-start",
  "& .flexDiv": {
    display: "flex",
    flex: 1,
  },
});

// 上から下に展開するスタイル
const TopToBottomDrawers = styled(CommonDrawers, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>(({ isOpen }) => ({
  top: 0,
  width: "95%",
  padding: "0 20px", // 共通のパディング
  height: isOpen ? "148px" : "48px",
  overflowY: isOpen ? "auto" : "hidden",
}));

// 下から上に展開するスタイル
const BottomToTopDrawers = styled(CommonDrawers, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>(({ isOpen }) => ({
  bottom: 0,
  width: "95%",
  padding: "0 20px", // 共通のパディング
  height: isOpen ? "100px" : "0",
  overflowY: isOpen ? "auto" : "hidden",
}));

// 左から右に展開するスタイル
const LeftToRightDrawers = styled(CommonDrawers, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>(({ isOpen }) => ({
  left: 0,
  width: isOpen ? "100px" : "0", // 例として300pxに設定
  padding: "20px 0", // 共通のパディング
  height: "100%",
  overflowY: isOpen ? "auto" : "hidden",
}));
