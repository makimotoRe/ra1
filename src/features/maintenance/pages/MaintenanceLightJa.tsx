import EngineeringIcon from "@mui/icons-material/Engineering";

import LaKeelLogoStandard from "../../../assets/LaKeel_RGB_02.png";
import "../style/MaintenanceLight.css";

export const MaintenanceLightJa = () => {
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
        <h1>サイトはメンテナンス中です</h1>
        <p>
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
    </>
  );
};
