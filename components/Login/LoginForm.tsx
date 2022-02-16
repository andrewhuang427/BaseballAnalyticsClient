import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";
import logo from "../../assets/logo.png";
import CustomInput from "../Shared/Inputs/CustomInput";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setIsLoading(!isLoading);
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    },
  });

  return (
    <Box
      maxWidth={550}
      paddingTop={15}
      marginLeft="auto"
      marginRight="auto"
      borderRadius={10}
    >
      <Paper elevation={0}>
        <Box padding={5}>
          <form onSubmit={formik.handleSubmit}>
            <Stack direction="column" spacing={3}>
              <Box>
                <Toolbar disableGutters>
                  <Box flexGrow={1}>
                    <Typography variant="h6">Login</Typography>
                  </Box>
                  <Box>
                    <Image
                      src={logo}
                      height={50}
                      width={50}
                      objectFit="contain"
                    />
                  </Box>
                </Toolbar>
              </Box>
              <Box>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="email-input">
                    Email Address
                  </InputLabel>
                  <CustomInput
                    id="email-input"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="password-input">
                    Password
                  </InputLabel>
                  <CustomInput
                    id="password-input"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </FormControl>
              </Box>
              <Box textAlign="center">
                <Typography variant="subtitle2">
                  Don't have an account yet?{" "}
                  <Link href="/register">
                    <a
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        marginLeft: 3,
                      }}
                    >
                      Register here.
                    </a>
                  </Link>
                </Typography>
              </Box>
              <Box>
                <Button
                  type="submit"
                  fullWidth
                  variant={isLoading ? "outlined" : "contained"}
                >
                  {isLoading ? (
                    <CircularProgress size={15} style={{ margin: 5 }} />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginForm;
