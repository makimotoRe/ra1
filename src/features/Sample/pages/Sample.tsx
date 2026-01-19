import { Title } from "react-admin";
import { styled } from "@mui/material/styles";

const Sample = ({children}:any) => {
  return (
    <SampleStyled>
    <Title title="Sample" />
    {children}
    </SampleStyled>
  );
};

export default Sample;

const SampleStyled = styled('div')(({ theme }) => ({
  }));