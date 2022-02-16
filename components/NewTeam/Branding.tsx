import { Stack, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ColorPicker from "./ColorPicker";
import ImageUpload from "./ImageUpload";

function Branding() {
  return (
    <Box marginBottom={5}>
      <Stack direction="column">
        <Box>
          <Toolbar disableGutters>
            <Box flexGrow={1}>
              <Typography variant="subtitle2">Upload Logo:</Typography>
            </Box>
            <Box justifyContent="flex-end">
              <ImageUpload />
            </Box>
          </Toolbar>
        </Box>
        <Box>
          <Toolbar disableGutters>
            <Box flexGrow={1}>
              <Typography variant="subtitle2">Primary Color: </Typography>
            </Box>
            <ColorPicker />
          </Toolbar>
        </Box>
        <Box>
          <Toolbar disableGutters>
            <Box flexGrow={1}>
              <Typography variant="subtitle2">Secondary Color:</Typography>
            </Box>
            <ColorPicker />
          </Toolbar>
        </Box>
      </Stack>
    </Box>
  );
}

export default Branding;
