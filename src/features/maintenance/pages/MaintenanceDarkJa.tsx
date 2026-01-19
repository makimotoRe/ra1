import ConstructionIcon from "@mui/icons-material/Construction";
import { styled } from "@mui/material/styles";

import LaKeelLogo from "../../../assets/LaKeel_RGB_DARKBG_02.png";

import "../style/MaintenanceDark.css";

export const MaintenanceDarkJa = () => {
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
            サイトはメンテナンス中です
            <ConstructionStyle />
          </p>
          <div className="backbutton">
            <p className="textSub">
              ご不便をおかけして申し訳ございません。
              <br />
              メンテナンス終了までしばらくお待ちください。
              <br />
              お問い合わせの必要がある場合は{" "}
              <a href="https://cloud.swcms.net/lakeelPublic/ja/inquiry/inquiry1.html">
                ここをクリック
              </a>{" "}
              してお問い合わせページにアクセスしてください。
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
