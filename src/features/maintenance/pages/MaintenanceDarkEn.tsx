import ConstructionIcon from "@mui/icons-material/Construction";
import { styled } from "@mui/material/styles";

import LaKeelLogo from "../../../assets/LaKeel_RGB_DARKBG_02.png";
import "../style/MaintenanceDark.css";

export const MaintenanceDarkEn = () => {
  return (
    <>
      <div className="back">
        <a
          href="https://www.lakeel.com/ja/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={LaKeelLogo} className="LogoStyle" alt="Logo" />
        </a>
      </div>
      <div className="maintenancePage">
        <div className="container">
          <p className="textMain">
            Site Under Maintenance
            <ConstructionStyle />
          </p>
          <div className="backbutton">
            <p className="textSub">
              Notice of Website Maintenance Due to Website Maintenance.
              <br />
              We apologize for any inconvenience this may cause.
              <br />
              If you need to contact us, please click{" "}
              <a href="https://cloud.swcms.net/lakeelPublic/ja/inquiry/inquiry1.html">
                here
              </a>{" "}
              to visit our contact page.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const ConstructionStyle = styled(ConstructionIcon)((theme) => ({
  fontSize: 40,
}));
