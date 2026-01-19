# React-Admin MUI コンポーネント一覧

このドキュメントでは、React-Admin アプリケーションで使用される Material-UI (MUI) を活用したコンポーネントを表形式でまとめています。各コンポーネントは、UI/UX を最大限に考慮して設計されています。

---

## ボタン一覧

| ボタン名           | 説明                                                                           | コード例                                     | スクリーンショット                              |
| ------------------ | ------------------------------------------------------------------------------ | -------------------------------------------- | ----------------------------------------------- |
| 通常のボタン       | 標準的なアクションに使用されるボタン。`primary` カラーを使用。                 | [コードを見る](#通常のボタン-コード例)       | ![通常のボタン](./images/primary-button.png)    |
| 危険時のボタン     | 削除や警告など、注意を促すアクションに使用されるボタン。`error` カラーを使用。 | [コードを見る](#危険時のボタン-コード例)     | ![危険なボタン](./images/danger-button.png)     |
| アイコン付きボタン | アイコンを含むボタンで、視覚的なヒントを提供。                                 | [コードを見る](#アイコン付きボタン-コード例) | ![アイコン付きボタン](./images/icon-button.png) |
| 無効化ボタン       | ユーザー操作を一時的に無効化するボタン。                                       | [コードを見る](#無効化ボタン-コード例)       | ![無効化ボタン](./images/disabled-button.png)   |

### 通常のボタン コード例

```tsx
import { Button } from "@mui/material";

const PrimaryButton = () => (
  <Button variant="contained" color="primary">
    通常のボタン
  </Button>
);

export default PrimaryButton;
```

### 危険時のボタン コード例

```tsx
import { Button } from "@mui/material";

const DangerButton = () => (
  <Button variant="contained" color="error">
    危険なボタン
  </Button>
);

export default DangerButton;
```

### アイコン付きボタン コード例

```tsx
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const IconButton = () => (
  <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
    保存
  </Button>
);

export default IconButton;
```

### 無効化ボタン コード例

```tsx
import { Button } from "@mui/material";

const DisabledButton = () => (
  <Button variant="contained" color="primary" disabled>
    無効化ボタン
  </Button>
);

export default DisabledButton;
```

---

## アイコン一覧

| アイコン名         | 説明                         | コード例                                     | スクリーンショット                              |
| ------------------ | ---------------------------- | -------------------------------------------- | ----------------------------------------------- |
| 保存アイコン       | 保存アクションに使用。       | [コードを見る](#保存アイコン-コード例)       | ![保存アイコン](./images/save-icon.png)         |
| ログアウトアイコン | ログアウトアクションに使用。 | [コードを見る](#ログアウトアイコン-コード例) | ![ログアウトアイコン](./images/logout-icon.png) |
| 編集アイコン       | 編集アクションに使用。       | [コードを見る](#編集アイコン-コード例)       | ![編集アイコン](./images/edit-icon.png)         |

### 保存アイコン コード例

```tsx
import SaveIcon from "@mui/icons-material/Save";

const SaveIconExample = () => <SaveIcon />;

export default SaveIconExample;
```

### ログアウトアイコン コード例

```tsx
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const LogoutIconExample = () => <ExitToAppIcon />;

export default LogoutIconExample;
```

### 編集アイコン コード例

```tsx
import EditIcon from "@mui/icons-material/Edit";

const EditIconExample = () => <EditIcon />;

export default EditIconExample;
```

---

## フォームコンポーネント一覧

| コンポーネント名   | 説明                                                 | コード例                                     | スクリーンショット                             |
| ------------------ | ---------------------------------------------------- | -------------------------------------------- | ---------------------------------------------- |
| テキストフィールド | ユーザー入力を受け付ける標準的なテキストフィールド。 | [コードを見る](#テキストフィールド-コード例) | ![テキストフィールド](./images/text-field.png) |
| チェックボックス   | オプションの選択に使用されるチェックボックス。       | [コードを見る](#チェックボックス-コード例)   | ![チェックボックス](./images/checkbox.png)     |

### テキストフィールド コード例

```tsx
import { TextField } from "@mui/material";

const TextFieldExample = () => <TextField label="名前" variant="outlined" />;

export default TextFieldExample;
```

### チェックボックス コード例

```tsx
import { Checkbox, FormControlLabel } from "@mui/material";

const CheckboxExample = () => (
  <FormControlLabel control={<Checkbox />} label="同意する" />
);

export default CheckboxExample;
```

---

## 注意事項

- すべてのコンポーネントは Material-UI を使用して設計されています。
- スクリーンショットは `./images/` ディレクトリに保存されています。
- 新しいコンポーネントを追加した場合、このドキュメントを更新してください。
