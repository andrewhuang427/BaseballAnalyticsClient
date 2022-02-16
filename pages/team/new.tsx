import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Close from "@mui/icons-material/Close";
import {
  AppBar,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import rocket from "../../assets/rocket.svg";
import csv from "../../assets/import.svg";
import Image from "next/image";

interface NewTeamOptionInterface {
  name: string;
  subtitle: string;
  path: string;
  icon: any;
}

function NewTeam() {
  const router = useRouter();
  return (
    <Box
      style={{
        height: "100vh",
        width: "100%",
        background: "#fefefe",
        overflow: "hidden",
      }}
    >
      <AppBar style={{ background: "inherit" }} elevation={0}>
        <Toolbar>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box>
              <IconButton
                size="small"
                onClick={() => {
                  router.back();
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                size="small"
                onClick={() => {
                  router.back();
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        padding={3}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <Box>
          <Box textAlign={"center"} marginBottom={4}>
            <Box marginBottom={1}>
              <Typography variant="h4">Create a new team</Typography>
            </Box>
            <Typography variant="subtitle2">
              How would you like to start?
            </Typography>
          </Box>
          <Box justifyContent={"center"}>
            <Stack direction="row" alignContent="center" spacing={3}>
              {options.map((option) => {
                return (
                  <TeamCard
                    key={option.name}
                    name={option.name}
                    subtitle={option.subtitle}
                    path={option.path}
                    icon={option.icon}
                  />
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default NewTeam;

const useStyles = makeStyles({
  paper: {
    transition: "0.5s",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#f3f3f3",
    },
  },
});

const options: NewTeamOptionInterface[] = [
  {
    name: "College",
    subtitle: "College Template",
    path: "/team/new/college",
    icon: csv,
  },
  {
    name: "Custom",
    subtitle: "Start from scratch",
    path: "/team/new/blank",
    icon: rocket,
  },
];

function TeamCard({ name, subtitle, path, icon }: NewTeamOptionInterface) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Paper
      elevation={0}
      className={classes.paper}
      onClick={() => {
        router.push(path);
      }}
    >
      <Box padding={3}>
        <Box marginBottom={2}>
          <Paper variant="outlined">
            <Box padding={3}>
              <Image src={icon} />
            </Box>
          </Paper>
        </Box>
        <Box maxWidth={130} textAlign="center">
          <Typography style={{ marginBottom: 10 }} variant="subtitle2">
            {name}
          </Typography>
          <Typography style={{ fontSize: 12 }}>{subtitle}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}
