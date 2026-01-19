import { styled } from "@mui/material/styles";
import { Button, CardContent, CircularProgress } from "@mui/material";
import {
  Form,
  useTranslate,
  useLogin,
  useNotify,
  useSafeSetState,
} from "ra-core";
import { TextInput } from "react-admin";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { authProvider } from "../../../auth/keycloakAuthProvider";

/**
 * Component: BaseLoginForm
 * role     : ログインフォーム
 * @param props
 * @param {string} props.redirectTo リダイレクト先
 * @param {string} props.className クラス名
 * @param {string} prop.path パスワードを忘れた場合のリンク
 * @param {[]} props.usernameValidation ユーザーネームバリデーション
 * @param {[]} props.passwordValidation パスワードバリデーション
 */

export const PureBaseLoginForm = (props: LoginFormProps) => {
  const {
    redirectTo,
    className
  } = props;
  const [loading, setLoading] = useSafeSetState(false);
  const login = useLogin();
  const translate = useTranslate();
  const notify = useNotify();

  const submit: SubmitHandler<FormData> = (values: FormData) => {
    setLoading(true);
    login(values, redirectTo)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        notify(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
              ? "ra.auth.sign_in_error"
              : error.message,
          {
            type: "error",
            messageArgs: {
              _:
                typeof error === "string"
                  ? error
                  : error && error.message
                    ? error.message
                    : undefined,
            },
          }
        );
      });
  };

  return (
    <StyledForm
      // onSubmit={submit}
      // onSubmit={() => authProvider.login({})}
      mode="onChange"
      noValidate
      className={className}
    // style={{ textAlign: "center" }}
    >
      <CardContent className={LoginFormClasses.content}>

        <Button
          variant="contained"
          // type="submit"
          color="primary"
          disabled={loading}
          fullWidth
          className={LoginFormClasses.button}
          onClick={() => authProvider.login({})}
        >
          {loading ? (
            <CircularProgress
              className={LoginFormClasses.icon}
              size={19}
              thickness={3}
            />
          ) : (
            translate("ra.auth.sign_in")
          )}
        </Button>
      </CardContent>
    </StyledForm>
  );
};

const PREFIX = "RaLoginForm";

export const LoginFormClasses = {
  content: `${PREFIX}-content`,
  button: `${PREFIX}-button`,
  icon: `${PREFIX}-icon`,
};

const StyledButton = styled(Button)({
  fontWeight: "400",
  textDecoration: "none",
  fontSize: "15px",
  color: "rgba(84, 79, 90, 0.7)",
  "&:hover": {
    textDecoration: "underline",
    background: "none",
  },
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  fontSize: "15px",
  color: "rgba(84, 79, 90, 0.7)",
  "&:hover": {
    textDecoration: "underline",
  },
});

const StyledForm = styled(Form, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${LoginFormClasses.content}`]: {
    width: 300,
  },
  [`& .${LoginFormClasses.button}`]: {
    marginTop: theme.spacing(2),
  },
  [`& .${LoginFormClasses.icon}`]: {
    margin: theme.spacing(0.3),
  },
}));

export interface LoginFormProps {
  redirectTo?: string;
  className?: string;
  forgotPassword?: any;
  usernameValidation?: [] | undefined;
  passwordValidation?: [] | undefined;
}

interface FormData {
  username: string;
  password: string;
}
