import EngineeringIcon from "@mui/icons-material/Engineering";

import LaKeelLogoStandard from "../../../assets/LaKeel_RGB_02.png";
import "../style/MaintenanceLight.css";

export const MaintenanceLightEn = () => {
  return (
    <>
      <header className="backe">
        <a
          href="https://www.lakeel.com/ja/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={LaKeelLogoStandard} className="LogoStyle" alt="Logo" />
        </a>
      </header>
      <div className="maintenance">
        <EngineeringIcon />
        <h1>Site Under Maintenance</h1>
        <p>
          Notice of Website Maintenance Due to Website Maintenance.
          <br />
          We apologize for any inconvenience this may cause.
          <br />
          If you need to contact us, please click{" "}
          <a href="https://cloud.swcms.net/lakeelPublic/ja/inquiry/inquiry1.html">
            here
          </a>
          to visit our contact page.
        </p>
      </div>
    </>
  );
};
