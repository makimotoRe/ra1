# React-Admin UI コンポーネント

このドキュメントでは、React-Admin アプリケーションで使用されているカスタム UI コンポーネントについて説明します。各セクションには、コンポーネントの説明、目的、および視覚的な例が含まれています。

---

## 1. カスタムボタン

### 説明

保存アクション用にデザインされたカスタムスタイルのボタンです。Material-UI の `Button` コンポーネントを使用し、モダンな外観にスタイリングされています。

### コード例

```tsx
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const CustomButton = () => (
  <Button
    variant="contained"
    size="large"
    style={{
      borderRadius: "8px",
      padding: "12px 24px",
      backgroundColor: "#1976d2",
      color: "#fff",
    }}
    startIcon={<SaveIcon />}
  >
    保存
  </Button>
);

export default CustomButton;
```

### スクリーンショット

![カスタムボタン](./images/custom-button.png)

---

## 2. カスタムレイアウト

### 説明

Material-UI の `Grid` システムを使用したレスポンシブレイアウトコンポーネントです。コンテンツを 2 つのセクションに分割して整理します。

### コード例

```tsx
import { Grid } from "@mui/material";

const CustomLayout = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <div>左側のコンテンツ</div>
    </Grid>
    <Grid item xs={12} sm={6}>
      <div>右側のコンテンツ</div>
    </Grid>
  </Grid>
);

export default CustomLayout;
```

### スクリーンショット

![カスタムレイアウト](./images/custom-layout.png)

---

## 3. カスタムログアウトボタン

### 説明

スタンドアロンのログインページにリダイレクトするログアウトボタンです。Material-UI の `Button` コンポーネントとアイコンを使用しています。

### コード例

```tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const CustomLogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/standalone-login");
  };

  return (
    <Button
      onClick={handleLogout}
      startIcon={<ExitToAppIcon />}
      color="inherit"
    >
      ログアウト
    </Button>
  );
};

export default CustomLogoutButton;
```

### スクリーンショット

![カスタムログアウトボタン](./images/custom-logout-button.png)

---

## 注意事項

- すべてのコンポーネントは、アプリケーションのデザインと一貫性を保つために Material-UI を使用してスタイリングされています。
- スクリーンショットは `./images/` ディレクトリに保存されています。
- 新しい UI コンポーネントが追加されたり、既存のコンポーネントが変更された場合は、このドキュメントを更新してください。
