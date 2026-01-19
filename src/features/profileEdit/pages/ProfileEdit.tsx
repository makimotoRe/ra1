import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import {
  TextInput,
  ImageInput,
  ImageField,
  SimpleForm,
  required,
  useDataProvider,
  useNotify,
  SaveContextProvider,
  useGetIdentity,
} from "react-admin";

// デフォルトのコンテキスト値を定義
const defaultContextValue = {
  profileVersion: 0,
  refreshProfile: () => {},
};

const ProfileContext = createContext(defaultContextValue);

export const ProfileProvider = ({ children }: any) => {
  const [profileVersion, setProfileVersion] = useState(0);
  const context = useMemo(
    () => ({
      profileVersion,
      refreshProfile: () =>
        setProfileVersion((currentVersion) => currentVersion + 1),
    }),
    [profileVersion]
  );

  return (
    <ProfileContext.Provider value={context}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

export const ProfileEdit = ({ staticContext, ...props }: any) => {
  console.log("ProfileEdit");
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const [saving, setSaving] = useState(true);
  const { refreshProfile } = useProfile();

  const { isLoading, identity } = useGetIdentity();

  const handleSave = useCallback(
    (values: any) => {
      setSaving(true);
      dataProvider.updateUserProfile(
        { data: values },
        {
          onSuccess: ({ data }: any) => {
            setSaving(false);
            notify("Your profile has been updated", { type: "info" });
            refreshProfile();
          },
          onFailure: () => {
            setSaving(false);
            notify(
              "A technical error occured while updating your profile. Please try later.",
              { type: "warning" }
              // "warning",
              // {
              //   _:
              //     "A technical error occured while updating your profile. Please try later."
              // }
            );
          },
        }
      );
    },
    [dataProvider, notify, refreshProfile]
  );

  const saveContext = useMemo(
    () => ({
      save: handleSave,
      saving,
    }),
    [saving, handleSave]
  );

  if (!isLoading) {
    return null;
  }

  return (
    <SaveContextProvider value={saveContext}>
      <SimpleForm onSubmit={handleSave} record={identity ? identity : {}}>
        <TextInput source="fullName" validate={required()} />
        <ImageInput source="avatar" validate={required()}>
          <ImageField />
        </ImageInput>
      </SimpleForm>
    </SaveContextProvider>
  );
};
