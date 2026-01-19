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

/**
 * Component: BaseLoginForm
 * role     : ログインフォーム
 * @param props
 * @param {string} props.redirectTo リダイレクト先
 * @param {string} props.className クラス名
 * @param {[]} props.usernameValidation ユーザーネームバリデーション
 * @param {[]} props.passwordValidation パスワードバリデーション
 */

export const BaseForgotPasswordForm = (props: ForgotPasswordFormProps) => {
  const {
    redirectTo,
    className,
    usernameValidation = undefined,
    passwordValidation = undefined,
  } = props;
  const [loading, setLoading] = useSafeSetState(false);
  const login = useLogin();
  const translate = useTranslate();
  const notify = useNotify();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
      onSubmit={submit}
      mode="onChange"
      noValidate
      className={className}
      style={{ textAlign: "center" }}
    >
      <CardContent className={LoginFormClasses.content}>
        {/* <TextInput
          autoFocus
          source="username"
          label={translate("ra.auth.username")}
          autoComplete="username"
          validate={usernameValidation}
        /> */}

        <TextInput
          autoFocus
          source="email"
          label={translate("email")}
          autoComplete="email"
          validate={usernameValidation}
        />
                <TextInput
          autoFocus
          source="username"
          label={translate("ra.auth.username")}
          autoComplete="username"
          validate={usernameValidation}
          sx={{visibility:"hidden"}}
        />

        <Button
          variant="contained"
          type="submit"
          color="inherit"
          disabled={loading}
          fullWidth
        >
          {loading ? (
            <CircularProgress
              className={LoginFormClasses.icon}
              size={19}
              thickness={3}
            />
          ) : (
            translate("Send Reset Link")
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

export interface ForgotPasswordFormProps {
  redirectTo?: string;
  className?: string;
  usernameValidation?: [] | undefined;
  passwordValidation?: [] | undefined;
}

interface FormData {
  username: string;
  password: string;
}
