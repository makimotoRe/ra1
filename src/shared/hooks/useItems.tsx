import React, { createContext, useContext, useState, ReactNode } from "react";
import { initialItems } from "../../features/dashboard/source/initialItems";

/**
 * custom hook: useItem
 * role       : Dashboardに表示させるアイテムのグローバル変数
 * usage      : const { items, setItems } = useItems();
 * @param {Item[]} items initialItemsに初期値を設定
 */

// Itemの型定義
interface Item {
  id: string;
  title: string;
  content: string;
  photo?: string;
  graph?: any[];
}

// Contextの作成
const ItemsContext = createContext<
  | {
      items: Item[];
      setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    }
  | undefined
>(undefined);

// Providerコンポーネントの作成
const ItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>(initialItems); // 初期値を設定

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

// カスタムフックの作成
const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemsProvider");
  }
  return context;
};

export { ItemsProvider, useItems };
