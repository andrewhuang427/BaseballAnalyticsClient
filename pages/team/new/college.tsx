import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Close from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  IconButton,
  LinearProgress,
  MobileStepper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import AddPlayers from "../../../components/NewTeam/AddPlayers";
import Branding from "../../../components/NewTeam/Branding";
import TeamNameForm from "../../../components/NewTeam/TeamNameForm";

function college() {
  const router = useRouter();
  const [teamName, setTeamName] = useState<string>("");
  const [teamId, setTeamId] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [creating, setCreating] = useState<boolean>(false);

  useEffect(() => {
    console.log("name: " + teamName + " id: " + teamId);
  }, [teamName, teamId]);

  const handleSubmit = () => {
    setActiveStep(activeStep + 1);
    setCreating(true);
  };

  return (
    <>
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
          minWidth={550}
        >
          {activeStep == 0 ? (
            <>
              <Box textAlign={"center"} marginBottom={4}>
                <Box marginBottom={1}>
                  <Typography variant="h4">Create a college team</Typography>
                </Box>
                <Typography variant="subtitle2">
                  Customize your team here
                </Typography>
              </Box>
              <TeamNameForm
                teamName={teamName}
                setTeamName={setTeamName}
                teamId={teamId}
                setTeamId={setTeamId}
              />
            </>
          ) : (
            ""
          )}
          {activeStep == 1 ? (
            <>
              <Box textAlign={"center"} marginBottom={4}>
                <Box marginBottom={1}>
                  <Typography variant="h4">Add your players</Typography>
                </Box>
                <Typography variant="subtitle2">
                  Select your current players. You can always add more players
                  later.
                </Typography>
              </Box>
              <AddPlayers teamId={teamId} />{" "}
            </>
          ) : (
            ""
          )}
          {activeStep == 2 ? (
            <>
              <Box textAlign={"center"} marginBottom={4}>
                <Box marginBottom={1}>
                  <Typography variant="h4">Team Branding</Typography>
                </Box>
                <Typography variant="subtitle2">
                  Add team logos and select primary colors.
                </Typography>
              </Box>
              <Branding />
            </>
          ) : (
            ""
          )}
          {creating ? (
            <Box textAlign={"center"} marginBottom={4}>
              <Box marginBottom={5}>
                <Typography variant="subtitle1">Creating Team</Typography>
              </Box>
              <Box>
                <LinearProgress />
              </Box>
            </Box>
          ) : (
            <MobileStepper
              style={{ position: "relative", padding: 0 }}
              steps={3}
              activeStep={activeStep}
              nextButton={
                activeStep === 2 ? (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleSubmit}
                  >
                    Create Team
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      setActiveStep(activeStep + 1);
                    }}
                    disabled={activeStep === 2}
                  >
                    Next
                  </Button>
                )
              }
              backButton={
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setActiveStep(activeStep - 1);
                  }}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
              }
            />
          )}
        </Box>
        {creating ? (
          <Box
            position="absolute"
            bottom="20px"
            left="50%"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <Toolbar>
              <Box marginRight={1}>
                <Image src={logo} height={30} width={30} objectFit="contain" />
              </Box>
              <Typography variant="subtitle2">Stat Track</Typography>
            </Toolbar>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}

export default college;
