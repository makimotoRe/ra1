import {
  LoadingIndicator,
  LocalesMenuButton,
  ToggleThemeButton,
  useLocales,
  useThemesContext,
} from "react-admin";

import { DefaultSettingMenu } from "./DefaultSettingMenu";

//Toolbar
export const DefaultToolbar = () => {
  const locales = useLocales();
  const { darkTheme } = useThemesContext();

  return (
    <>
      {locales && locales.length > 1 ? <LocalesMenuButton /> : null}
      {darkTheme && <ToggleThemeButton />}
      <LoadingIndicator />
      <DefaultSettingMenu />
    </>
  );
};
