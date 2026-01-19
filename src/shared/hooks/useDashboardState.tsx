// DashboardContext.js
import React, { createContext, useState, useContext, ReactNode } from "react";

/**
 * custom hook: useDashboardState
 * role       : Dashboardのグローバル状態管理
 * usage      : const { dashboardState , setEditMode , setStableMode } = useDashboardState();
 * @param {'edit'|'stable'} dashboardState dashboardの状態
 */

type DashboardState = "stable" | "edit";

// Contextの作成
const DashboardContext = createContext({
  dashboardState: "stable",
  setDashboardState: (state: DashboardState) => {},
});

// プロバイダーコンポーネントの作成
const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dashboardState, setDashboardState] = useState("stable");

  return (
    <DashboardContext.Provider value={{ dashboardState, setDashboardState }}>
      {children}
    </DashboardContext.Provider>
  );
};

// カスタムフックの作成
const useDashboardState = () => {
  const { dashboardState, setDashboardState } = useContext(DashboardContext);

  const setEditMode = () => setDashboardState("edit");
  const setStableMode = () => setDashboardState("stable");

  return {
    dashboardState,
    setEditMode,
    setStableMode,
  };
};

export { useDashboardState, DashboardProvider };
