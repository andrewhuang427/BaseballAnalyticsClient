import { Box } from "@mui/material";
import { FC } from "react";

interface LoginRegisterContainerProps {
  children: JSX.Element;
}

function LoginRegisterContainer({ children }: LoginRegisterContainerProps) {
  return <Box >{children}</Box>;
}

export default LoginRegisterContainer;
