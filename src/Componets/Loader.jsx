import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import React from "react";

function Loader(props) {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          bottom: "50%",
          left: "50%",
          right: "50%",
        }}
      >
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={(theme) => ({
            color: "#1a90ff",
            animationDuration: "550ms",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
            ...theme.applyStyles("dark", {
              color: "#308fe8",
            }),
          })}
          size={40}
          thickness={4}
          {...props}
        />
      </Box>
    </>
  );
}

export default Loader;
