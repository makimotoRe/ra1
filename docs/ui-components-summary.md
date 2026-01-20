# UI コンポーネント概要

## MUI カラー設定

| カラー名  | HEX 値  |
| --------- | ------- |
| primary   | #2196F3 |
| secondary | #FF4081 |
| white     | #FFFFFF |
| black     | #000000 |
| gray      | #9E9E9E |

## 使用している MUI アイコン一覧

| アイコン名                        | 説明                       |
| --------------------------------- | -------------------------- |
| `<LoginIcon />`                   | ログイン用のアイコン       |
| `<CircularProgress />`            | ローディングインジケーター |
| `<PersonIcon />`                  | ユーザーを表すアイコン     |
| `<ManageAccountsIcon />`          | アカウント管理アイコン     |
| `<DashboardIcon />`               | ダッシュボードアイコン     |
| `<AccountBoxIcon />`              | アカウントボックスアイコン |
| `<SettingsIcon />`                | 設定用のアイコン           |
| `<PersonAddAlt1Icon />`           | ユーザー追加アイコン       |
| `<DashboardCustomizeIcon />`      | ダッシュボードカスタマイズ |
| `<KeyboardDoubleArrowUpIcon />`   | 上向き矢印アイコン         |
| `<KeyboardDoubleArrowDownIcon />` | 下向き矢印アイコン         |
| `<Avatar />`                      | アバターアイコン           |

| コンポーネントカテゴリ | ファイル名                                        | コンポーネント名   | 説明                                                   | 色      | 使用アイコン (MUI)                                                        | Props                | 仕様コンポーネント (MUI)      | 使用コンポーネント | 備考                                                                         |
| ---------------------- | ------------------------------------------------- | ------------------ | ------------------------------------------------------ | ------- | ------------------------------------------------------------------------- | -------------------- | ----------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| ボタン                 | App.tsx                                           | CustomButton       | カスタムスタイルのボタンコンポーネント。               | primary | なし                                                                      | なし                 | `<Button />`                  | App, CustomApp     | ユーザーが直感的に操作できるよう、視覚的なフィードバックを追加しました。     |
| レイアウト             | App.tsx                                           | CustomLayout       | アプリケーションのレイアウトコンポーネント。           | white   | なし                                                                      | なし                 | `<Grid />`, `<Box />`         | App, CustomApp     | レスポンシブデザインを考慮し、画面サイズに応じてレイアウトを調整します。     |
| アプリケーション       | App.tsx                                           | App                | メインのアプリケーションコンポーネント。               | -       | なし                                                                      | なし                 | `<Router />`                  | -                  | 初心者でも使いやすいよう、シンプルなナビゲーションを採用しました。           |
| ボタン                 | CustomApp.tsx                                     | CustomButton       | カスタムスタイルのボタンコンポーネント。               | primary | なし                                                                      | なし                 | `<Button />`                  | App, CustomApp     | ユーザーが直感的に操作できるよう、視覚的なフィードバックを追加しました。     |
| レイアウト             | CustomApp.tsx                                     | CustomLayout       | アプリケーションのレイアウトコンポーネント。           | white   | なし                                                                      | なし                 | `<Grid />`, `<Box />`         | App, CustomApp     | レスポンシブデザインを考慮し、画面サイズに応じてレイアウトを調整します。     |
| アプリケーション       | CustomApp.tsx                                     | CustomApp          | メインアプリケーションコンポーネントのバリエーション。 | -       | なし                                                                      | なし                 | `<Router />`                  | -                  | 初心者でも使いやすいよう、シンプルなナビゲーションを採用しました。           |
| ログイン               | LoginPage.tsx                                     | KeycloakLoginCard  | Keycloak 認証用のログインカードコンポーネント。        | white   | `<LoginIcon />`                                                           | なし                 | `<Card />`, `<CardContent />` | LoginPage          | ユーザーが簡単にログインできるよう、エラーメッセージを明確に表示します。     |
| ログイン               | LoginPage.tsx                                     | LoginPage          | ログインページコンポーネント。                         | -       | なし                                                                      | なし                 | `<Grid />`, `<Box />`         | App                | ログインプロセスを簡略化し、スムーズな体験を提供します。                     |
| ローディング           | LoadingPage.tsx                                   | LoadingPage        | ローディング画面コンポーネント。                       | -       | `<CircularProgress />`                                                    | なし                 | `<CircularProgress />`        | App                | ユーザーが待機中であることを明確に伝えるため、アニメーションを使用します。   |
| ログインフォーム       | features/login/components/PureLoginForm.tsx       | PureLoginForm      | ログインフォームコンポーネント。                       | white   | `<PersonIcon />`                                                          | `PureLoginFormProps` | `<TextField />`, `<Button />` | LoginPage          | 入力フィールドのエラーをリアルタイムで検出し、ユーザーに通知します。         |
| テキスト               | features/login/components/PureLoginForm.tsx       | LargeText          | スタイル付きの大きなテキスト。                         | black   | なし                                                                      | なし                 | `<Typography />`              | PureLoginForm      | 視認性を向上させるため、大きなフォントサイズを採用しました。                 |
| テキスト               | features/login/components/PureLoginForm.tsx       | SmallTextStyle     | スタイル付きの小さなテキスト。                         | gray    | なし                                                                      | なし                 | `<Typography />`              | PureLoginForm      | サブ情報としての役割を果たすため、控えめなスタイルを採用しました。           |
| コンテナ               | features/login/components/PureLoginForm.tsx       | WholeBox           | スタイル付きのコンテナ。                               | white   | なし                                                                      | なし                 | `<Box />`                     | PureLoginForm      | コンテンツを整理し、視覚的な区切りを提供します。                             |
| コンテナ               | features/login/components/PureLoginForm.tsx       | StyledDiv          | スタイル付きの div 要素。                              | -       | なし                                                                      | なし                 | `<Box />`                     | PureLoginForm      | レイアウトの柔軟性を高めるため、カスタムスタイルを適用しました。             |
| アイコン               | features/login/components/PureLoginForm.tsx       | IconStyle          | スタイル付きのアイコンコンポーネント。                 | -       | `<ManageAccountsIcon />`                                                  | なし                 | `<Icon />`                    | PureLoginForm      | ユーザーが直感的に理解できるよう、適切なアイコンを選択しました。             |
| ダッシュボード         | components/dashboard/Dashboard.tsx                | Dashboard          | ダッシュボードコンポーネント。                         | white   | `<DashboardIcon />`                                                       | なし                 | `<Paper />`, `<Grid />`       | App                | ユーザーが必要な情報を一目で把握できるよう、情報を整理しました。             |
| ユーザーメニュー       | features/appbar/components/DefaultUserMenu.tsx    | DefaultUserMenu    | ユーザーメニューを提供するコンポーネント。             | -       | `<AccountBoxIcon />`                                                      | `UserMenuProps`      | `<MenuItem />`, `<Logout />`  | DefaultAppbar      | ユーザーが簡単に操作できるよう、メニュー項目を明確にしました。               |
| ポップオーバー         | shared/components/Popover/BasePopover.tsx         | BasePopover        | ポップオーバーを提供する汎用コンポーネント。           | -       | `<SettingsIcon />`                                                        | `BasePopoverProps`   | `<Menu />`, `<Tooltip />`     | DefaultSettingMenu | ユーザーが必要な情報にすぐアクセスできるよう、ポップオーバーを採用しました。 |
| 設定メニュー           | features/appbar/components/DefaultSettingMenu.tsx | DefaultSettingMenu | 設定メニューを提供するコンポーネント。                 | -       | `<SettingsIcon />`, `<PersonAddAlt1Icon />`, `<DashboardCustomizeIcon />` | `MenuProps`          | `<MenuItem />`, `<Logout />`  | DefaultAppbar      | ユーザーが設定を簡単に変更できるよう、直感的なデザインを採用しました。       |
