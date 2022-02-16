import { Box, Button, Paper, Popover, Stack } from "@mui/material";
import { useState } from "react";

const colors: string[] = [
  "#cc4747",
  "#f08b43",
  "#f0c543",
  "#4bb344",
  "#41baac",
  "#458fcc",
  "#454ecc",
  "#8945cc",
  "#cc45a4",
  "#b0b0b0",
  "#4d4d4d",
];
function ColorPicker() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        style={{ padding: 0, minWidth: "auto" }}
        onClick={handlePopoverOpen}
      >
        <Paper variant="outlined">
          <Box
            width={50}
            height={50}
            style={{
              cursor: "pointer",
              background: selectedColor !== null ? selectedColor : "auto",
              borderRadius: 10,
              overflow: "hidden",
            }}
          ></Box>
        </Paper>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box padding={2}>
          <Stack direction="row" spacing={1}>
            {colors.map((color) => {
              return (
                <Button
                  style={{ padding: 0, minWidth: "auto" }}
                  onClick={() => {
                    setSelectedColor(color);
                  }}
                >
                  <Box
                    style={{
                      background: color,
                      cursor: "pointer",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                    width={30}
                    height={30}
                  />
                </Button>
              );
            })}
          </Stack>
        </Box>
      </Popover>
    </>
  );
}

export default ColorPicker;
