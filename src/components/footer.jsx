import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: "auto",
        backgroundColor: "primary.main",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Blog Website. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
