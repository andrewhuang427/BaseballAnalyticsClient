import Add from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  styled,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddPlayerModal from "./AddPlayerModal";
import EditPlayerModal from "./EditPlayerModal";

interface Player {
  firstname: string;
  lastname: string;
  id: number;
  position: string;
}

interface AddPlayersInputProps {
  teamId: number | null;
}

const TCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
}));

function AddPlayers({ teamId }: AddPlayersInputProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayers, setActivePlayers] = useState<Set<number>>(new Set());
  const [addPlayerModalOpen, setAddPlayerModalOpen] = useState<boolean>(false);
  const [editPlayer, setEditPlayer] = useState<Player | null>(null);
  const [editPlayerModalOpen, setEditPlayerModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      console.log(teamId);
      if (teamId !== undefined && teamId !== null) {
        const response = await axios.get(`/api/players?team_id=${teamId}`);
        console.log(response);
        setTimeout(() => {
          setPlayers(response.data);
          setIsLoading(false);
        }, 500);
      }
    };
    fetchPlayers();
  }, [teamId]);

  useEffect(() => {
    console.log(activePlayers);
  }, [activePlayers]);

  return (
    <Box marginBottom={5}>
      {isLoading ? (
        <Box margin={10} textAlign="center" justifyContent={"center"}>
          <CircularProgress size="1.5rem" />
        </Box>
      ) : (
        <>
          <Stack direction="column" spacing={4}>
            <Box>
              <TableContainer style={{ maxHeight: 450 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="center">Position</TableCell>
                      <TableCell align="center">Active</TableCell>
                      <TableCell align="center" style={{ padding: 12 }}>
                        <Tooltip title="Add player">
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                              setAddPlayerModalOpen(true);
                            }}
                            startIcon={<Add />}
                          >
                            Add
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {players.map((player) => {
                      return (
                        <TableRow key={player.id}>
                          <TCell>
                            <Typography variant="subtitle2">
                              {player.lastname + ", " + player.firstname}
                            </Typography>
                          </TCell>
                          <TCell align="center">
                            <Typography variant="subtitle2">
                              {player.position}
                            </Typography>
                          </TCell>
                          <TCell align="center">
                            <Switch
                              size="small"
                              color="success"
                              checked={activePlayers.has(player.id)}
                              onClick={() => {
                                const newSet = new Set(activePlayers);
                                if (activePlayers.has(player.id)) {
                                  newSet.delete(player.id);
                                } else {
                                  newSet.add(player.id);
                                }
                                setActivePlayers(newSet);
                              }}
                            />
                          </TCell>
                          <TCell align="center">
                            <Tooltip title="Edit Player">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  console.log(player);
                                  setEditPlayer(player);
                                  setEditPlayerModalOpen(true);
                                }}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </Tooltip>
                          </TCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            {activePlayers.size > 0 ? (
              <Box textAlign={"center"}>
                <Chip
                  size="small"
                  color="success"
                  label={activePlayers.size + " Active Players"}
                />
              </Box>
            ) : (
              ""
            )}
          </Stack>
          <AddPlayerModal
            open={addPlayerModalOpen}
            setOpen={setAddPlayerModalOpen}
          />
          <EditPlayerModal
            player={editPlayer}
            open={editPlayerModalOpen}
            setOpen={setEditPlayerModalOpen}
          />
        </>
      )}
    </Box>
  );
}

export default AddPlayers;
