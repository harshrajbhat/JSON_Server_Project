import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import GroupIcon from "@mui/icons-material/Group";

const Navbar = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("");

  const handleButtonClick = (buttonName, path) => {
    setSelectedButton(buttonName);
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#2c387e",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            {selectedButton || "Home"}
          </Typography>

          {/* Navigation buttons */}
          <Box>
            <Button
              startIcon={<HomeIcon />}
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
                "&:hover": {
                  backgroundColor: "#4753d6",
                  boxShadow: "0 4px 12px rgba(71, 83, 214, 0.5)",
                },
              }}
              onClick={() => handleButtonClick("Home", "/")}
            >
              Home
            </Button>
            <Button
              startIcon={<PersonIcon />}
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
                "&:hover": {
                  backgroundColor: "#4753d6",
                  boxShadow: "0 4px 12px rgba(71, 83, 214, 0.5)",
                },
              }}
              onClick={() => handleButtonClick("Authors", "/authors")}
            >
              Authors
            </Button>
            <Button
              startIcon={<ArticleIcon />}
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
                "&:hover": {
                  backgroundColor: "#4753d6",
                  boxShadow: "0 4px 12px rgba(71, 83, 214, 0.5)",
                },
              }}
              onClick={() => handleButtonClick("Posts", "/posts")}
            >
              Posts
            </Button>
            <Button
              startIcon={<GroupIcon />}
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
                "&:hover": {
                  backgroundColor: "#4753d6",
                  boxShadow: "0 4px 12px rgba(71, 83, 214, 0.5)",
                },
              }}
              onClick={() => handleButtonClick("Users", "/users")}
            >
              Users
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
