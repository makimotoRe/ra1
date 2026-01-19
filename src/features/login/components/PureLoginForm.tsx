import { Button, Theme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { motion, AnimatePresence } from "framer-motion";

import { BaseLoginForm } from "../../../shared/components/Form/BaseLoginForm";
import { regex, required } from "react-admin";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BaseForgotPasswordForm } from "../../../shared/components/Form/BaseForgotPasswordForm";
import { PureBaseLoginForm } from "../../../shared/components/Form/PureBaseLoginForm";

const logo = "LaKeel";
const largeMessage = "- Centralized User Management -";
const smallMessage = "ManagerAccount";

// 管理用ログインフォーム
const PureLoginForm = (props: any) => {
  const [showBaseForm, setShowBaseForm] = useState(true);

  const isXSmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );
  return (
    <>
      <StyledDiv className={!isXSmall ? "largeBox" : "smallBox"}>
        <WholeBox>
          <div className="largeText">
            <LargeText>
              <motion.p
                className="Logo"
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
              >
                {logo}
              </motion.p>
              <motion.p
                className="Message"
                initial="hidden"
                animate="visible"
                variants={fadeInVariantsText}
              >
                {largeMessage}
              </motion.p>
            </LargeText>
          </div>

          <div className="card">
            <div className="scope">
              <SmallTextStyle className="smallText">
                {smallMessage}
              </SmallTextStyle>
              <IconStyle />
            </div>
              <PureBaseLoginForm
                className="loginform"
                {...props}
              />
          </div>
          {props.children}
        </WholeBox>
      </StyledDiv>
    </>
  );
};
export default PureLoginForm;

const LargeText = styled("div")((theme) => ({
  textAlign: "center",
  marginBottom: "20px",
  marginRight: "280px",
  fontFamily: "Impact",
  "& .Logo": {
    fontSize: "100px",
    marginBottom: "0",
    textAlign: "center",
  },
  "& .Message": {
    fontSize: "18px",
    textAlign: "center",
  },
}));

const SmallTextStyle = styled("p")((theme) => ({
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 20,
  marginTop: 8,
  marginBottom: -5,
}));

const WholeBox = styled("div")((theme) => ({
  textAlign: "center",
  justifyContent: "center",
  display: "flex",
  "& .scope": {
    justifyContent: "center",
    display: "flex",
  },
}));

const StyledDiv = styled("div")(({ theme }) => ({
  "&.smallBox": {
    backgroundColor: "white",
    boxShadow:
      "rgba(144, 85, 253, 0.2) -2px 2px, rgba(144, 85, 253, 0.1) -4px 4px, rgba(144, 85, 253, 0.05) -6px 6px",
    borderColor: "rgba(144, 85, 253, 0.2)",
    "& .largeText": {
      display: "none",
    },
    "& .loginform": {
      backgroundColor: "white",
    },
    "& .scope": {
      backgroundColor: "white",
      marginTop: "30px",
    },
  },
  "&.largeBox": {
    "& .smallText": {
      display: "none",
    },
    "& .card": {
      marginTop: 40,
    },
  },
}));

const IconStyle = styled(ManageAccountsIcon)((theme) => ({
  display: "flex",
  marginTop: -8,
  marginBottom: -5,
  width: 60,
  height: 60,
  textAlign: "center",
  justifyContent: "center",
}));

const fadeInVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
};

const fadeInVariantsText = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.5, duration: 1 },
  },
};
