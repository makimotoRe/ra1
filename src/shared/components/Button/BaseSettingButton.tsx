import { Button } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const BaseSettingButton: React.FC<MyComponentProps> = ({
  className,
  children,
}) => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", zIndex: "100" }}>
        <Button className={`custom-button ${className ? className : ""}`}>
          <SettingsIcon className="icon" />
          {children}
          <div className="setting">setting</div>
        </Button>
      </div>
    </>
  );
};

export default BaseSettingButton;

interface MyComponentProps {
  className?: string;
  children?: any;
}
