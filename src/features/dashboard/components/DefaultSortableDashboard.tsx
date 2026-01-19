import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Item } from "../source/initialItems";
import { useItems } from "../../../shared/hooks/useItems";
import { useDashboardState } from "../../../shared/hooks/useDashboardState";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useSidebarState } from "react-admin";
import { BaseDndContext } from "../../../shared/components/Dnd/BaseDndContext";
import { BaseAccordion } from "../../../shared/components/Accordion/BaseAccordion";

//drag and drop 可能なsortableDashboardコンポーネント
const DefaultSortableDashboard: React.FC<SortableDashboard> = ({
  children,
}) => {
  const { items, setItems } = useItems();
  const { dashboardState, setStableMode } = useDashboardState();
  const [open, setOpen] = useSidebarState();

  //編集モードの初期化
  useEffect(() => {
    setStableMode();
  }, []);

  //sidebarが編集中は開かないように
  useEffect(() => {
    if (dashboardState === "edit") setOpen(false);
  }, [open]);

  //Deleteハンドラ
  const handleDelete = (id: string) => {
    // 指定されたIDのアイテムのisVisibleをfalseに設定
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isVisible: false } : item
      )
    );
  };

  //Adderハンドラ
  const handleAdder = (id: string) => {
    // 指定されたIDのアイテムのisVisibleをfalseに設定
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isVisible: true } : item
      )
    );
  };

  return (
    <>
      {dashboardState === "stable" ? (
        <div>
          <BaseDndContext>{children}</BaseDndContext>
        </div>
      ) : (
        //editMode
        <>
          <SaveButtonSmall variant="contained" onClick={setStableMode}>
            Save
          </SaveButtonSmall>
          {/* 上の要素 */}
          <BaseDndContext
            props={{
              handler: handleDelete,
              Icon: CloseIcon,
            }}
          >
            {children}
          </BaseDndContext>
          {/* 下の削除済要素 */}
          <BaseAccordion>
            <BaseDndContext
              gridContainerProps={{ spacing: 1, style: { width: "90%" } }}
              props={{
                handler: handleAdder,
                text: "Add",
                Icon: AddIcon,
                style: {
                  display: "flex",
                  height: "100px",
                  alignItems: "center",
                },
                gridProps: { xs: 12, sm: 4, md: 2.4 },
              }}
              isVisible={false}
            >
              {children}
            </BaseDndContext>
          </BaseAccordion>
          <SaveButton
            variant="contained"
            onClick={() => {
              setStableMode();
            }}
          >
            Save
          </SaveButton>
        </>
      )}
    </>
  );
};
export default DefaultSortableDashboard;

interface SortableDashboard {
  children: (item: Item) => React.ReactElement;
}

// SaveButtonのスタイルを定義
const SaveButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  bottom: "30px",
  right: "50px",
  arginRight: "0px",
  zIndex: 5,
  [theme.breakpoints.down(1200)]: {
    right: "30px",
  },
  [theme.breakpoints.down(950)]: {
    right: "10px",
  },
  [theme.breakpoints.down(750)]: {
    right: "0px",
  },
  [theme.breakpoints.down(600)]: {
    display: "none",
  },
}));

const SaveButtonSmall = styled(Button)(({ theme }) => ({
  marginRight: "0px",
  display: "none",
  [theme.breakpoints.down(600)]: {
    display: "flex",
    marginTop: "20px",
    width: "10px",
    alignSelf: "flex-end",
    float: "right",
  },
}));
