import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomInput from "../Shared/Inputs/CustomInput";
import CustomSelect from "../Shared/Inputs/CustomSelect";

interface Team {
  name: string;
  id: number;
}

interface TeamNameFormInputProps {
  teamName: string;
  setTeamName: React.Dispatch<React.SetStateAction<string>>;
  teamId: number | null;
  setTeamId: React.Dispatch<React.SetStateAction<number | null>>;
}

function TeamNameForm({
  teamName,
  setTeamName,
  teamId,
  setTeamId,
}: TeamNameFormInputProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [customName, setCustomName] = useState<boolean>(false);

  const handleChange = (event: { target: { value: string } }) => {
    setTeamName(event.target.value);
  };

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await axios.get("/api/teams");
      setTeams(response.data);
    };
    fetchTeams();
  }, []);

  return (
    <Stack direction="column" spacing={2} marginBottom={3}>
      {customName ? (
        ""
      ) : (
        <Box>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-customized-select-label" shrink={true}>
              Select University
            </InputLabel>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={teamName}
              onChange={handleChange}
              input={<CustomSelect />}
            >
              <MenuItem
                value=""
                onClick={() => {
                  setTeamId(null);
                }}
              >
                <em>None</em>
              </MenuItem>
              {teams.map((team) => {
                return (
                  <MenuItem
                    key={team.id}
                    value={team.name}
                    onClick={() => {
                      setTeamId(team.id);
                    }}
                  >
                    {team.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      )}
      <Box>
        <Toolbar disableGutters>
          <Typography variant="subtitle2">School not found?</Typography>
          <Switch
            size="medium"
            color="error"
            checked={customName}
            onChange={() => {
              setCustomName(!customName);
            }}
          />
        </Toolbar>
      </Box>
      {customName ? (
        <Box marginBottom={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="team-name-input">
              University Name
            </InputLabel>
            <CustomInput id="team-name-input" name="Team Name" />
          </FormControl>
        </Box>
      ) : (
        ""
      )}
    </Stack>
  );
}

export default TeamNameForm;
