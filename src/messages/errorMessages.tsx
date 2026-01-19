// errorMessages.js
import englishMessages from "ra-language-english";
import { I18nProvider } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";

//APIError記述
const errorMessages = {
  logout: {},
  login: {
    400: {
      default: "IDまたはパスワードが間違っています。",
      INVALID_CREDENTIALS: "IDまたはパスワードが間違っています。",
    },
    422: {
      default: "入力内容が正しくありません",
      STRING_TOO_SHORT: "6文字以上でお願いします",
      STRING_TOO_LONG: "20文字以内でお願いします",
    },
    403: "不正なアクセスが検知されました",
    429: "ログイン試行回数が多すぎます。しばらくしてから再試行してください。",
    503: "サービスが一時的に利用できません",
    default: "サーバーエラーが発生しました",
  },
};

export default errorMessages;

// カスタムエラーメッセージを追加
// 日本語にしたいエラーあれば随時追記
const customEnglishMessages = {
  ...englishMessages,
  ra: {
    ...englishMessages.ra,
    message: {
      ...englishMessages.ra.message,
      invalid_form: "フォームにエラーがあります。確認してください。",
    },
  },
};

// i18nProviderの設定
export const i18nProvider: I18nProvider = polyglotI18nProvider(
  () => customEnglishMessages,
  "en",
  [{ name: "en", value: "English" }],
  { allowMissing: true }
);
