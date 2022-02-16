import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/logo.png";

function Navbar() {
  return (
    <AppBar color="secondary">
      <Toolbar>
        <Box marginRight={2}>
          <Image src={Logo} height={50} width={50} objectFit="contain" />
        </Box>
        <Box flexGrow={1}>
          <Typography>Stat Track</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="contained">Sign-up</Button>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
