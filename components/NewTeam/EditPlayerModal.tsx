import Close from "@mui/icons-material/Close";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import CustomInput from "../Shared/Inputs/CustomInput";
import CustomSelect from "../Shared/Inputs/CustomSelect";
import * as yup from "yup";
import { useFormik } from "formik";

interface Player {
  firstname: string;
  lastname: string;
  id: number;
  position: string;
}

interface AddPlayerModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  player: Player | null;
}

const positions: string[] = ["INF", "P", "UT", "OF", "C"];

const validationSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
});

function EditPlayerModal({ player, open, setOpen }: AddPlayerModalProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      firstname: player !== null ? player.firstname : "",
      lastname: player !== null ? player.lastname : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleClose();
    },
  });

  useEffect(() => {
    if (player !== null) {
      formik.setFieldValue("firstname", player?.firstname);
      formik.setFieldValue("lastname", player.lastname);
    }
  }, [player]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        width={600}
        position="absolute"
        top="50%"
        left="50%"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <Paper>
          <Box padding={4}>
            <form onSubmit={formik.handleSubmit}>
              <Stack direction="column" spacing={4}>
                <Box>
                  <Toolbar style={{ minHeight: 20 }} disableGutters>
                    <Box flexGrow={1}>
                      <Typography variant="subtitle1">Edit Player</Typography>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={handleClose}>
                        <Close />
                      </IconButton>
                    </Box>
                  </Toolbar>
                </Box>

                <Box display="flex">
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel shrink htmlFor="first-name-input">
                          First Name
                        </InputLabel>
                        <CustomInput
                          id="first-name-input"
                          name="firstname"
                          value={formik.values.firstname}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.firstname &&
                            Boolean(formik.errors.firstname)
                          }
                          helperText={
                            formik.touched.firstname && formik.errors.firstname
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel shrink htmlFor="last-name-input">
                          Last Name
                        </InputLabel>
                        <CustomInput
                          id="last-name-input"
                          name="lastname"
                          value={formik.values.lastname}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.lastname &&
                            Boolean(formik.errors.lastname)
                          }
                          helperText={
                            formik.touched.lastname && formik.errors.lastname
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="position-select-label" shrink={true}>
                          Position
                        </InputLabel>
                        <Select
                          labelId="position-select-label"
                          id="position-select"
                          input={<CustomSelect />}
                          onChange={formik.handleChange}
                        >
                          <MenuItem value=" ">None</MenuItem>
                          {positions.map((position) => {
                            return (
                              <MenuItem key={position} value={position}>
                                {position}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="small"
                  >
                    Save Changes
                  </Button>
                </Box>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}

export default EditPlayerModal;
