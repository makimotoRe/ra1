import { AppBar, useGetIdentity, UserMenu } from "react-admin";
import Avatar from "@mui/material/Avatar";

//authProviderのIdentityからavatarとfullNameを取得
export const BaseAvatar = () => {
  const { identity } = useGetIdentity();
  return (
    <>
      <Avatar
        sx={{
          height: 30,
          width: 30,
        }}
        src="https://marmelab.com/images/avatars/adrien.jpg"
      />
      <div
        style={{
          fontSize: "18px",
          marginLeft: "5px",
          fontFamily: " Gabarito, tahoma, sans-serif",
          color: "rgb(80, 0, 80)",
        }}
      >
        {identity?.fullName ? identity.fullName : "Jocob"}
      </div>
    </>
  );
};
