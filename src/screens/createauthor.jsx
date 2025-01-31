import React, { useState } from "react";
import { TextField, Button, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox"; // Icon for Create Author
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const CreateAuthor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [numPosts, setNumPosts] = useState(0);
  const [numComments, setNumComments] = useState(0);
  const [numLikes, setNumLikes] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !phone) {
      setErrorMessage("All fields are required.");
      return;
    }

    const newAuthor = {
      firstName,
      lastName,
      phone,
      numPosts,
      numComments,
      numLikes,
    };

    try {
      const response = await fetch("http://localhost:3000/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAuthor),
      });

      if (response.ok) {
        setSuccessMessage("Author created successfully!");
        setFirstName("");
        setLastName("");
        setPhone("");
        setNumPosts(0);
        setNumComments(0);
        setNumLikes(0);
      } else {
        throw new Error("Failed to create author.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={{backgroundColor:"#e3f2fd"}}>
    <Container maxWidth="sm" style={{ marginTop: "20px", marginBottom: "20px", backgroundColor: "#e3f2fd" }}>
      
      <Typography
        variant="h4"
        component="div"
        style={{
          marginBottom: "20px",
          textAlign: "center",
          color: "#1976d2",
        }}
      >
      <PersonAddAlt1Icon style={{fontSize: "50px", marginRight:"20px"}}/>
        Create New Author
      </Typography>

      {errorMessage && (
        <Typography variant="body2" color="error" style={{ marginBottom: "10px", textAlign: "center" }}>
          {errorMessage}
        </Typography>
      )}

      {successMessage && (
        <Typography variant="body2" color="primary" style={{ marginBottom: "10px", textAlign: "center" }}>
          {successMessage}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Card
          sx={{
            padding: "20px",
            background: "#ffffff",
            borderRadius: "15px",
            marginBottom: "20px",
            "&:hover": {
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              transform: "scale(1.03)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <CardContent>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Number of Posts"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={numPosts}
              onChange={(e) => setNumPosts(Number(e.target.value))}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Number of Comments"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={numComments}
              onChange={(e) => setNumComments(Number(e.target.value))}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Number of Likes"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={numLikes}
              onChange={(e) => setNumLikes(Number(e.target.value))}
              style={{ marginBottom: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              style={{ marginTop: "20px" }}
              startIcon={<AddBoxIcon />}
            >
              Create Author
            </Button>
          </CardContent>
        </Card>
      </form>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Card
            sx={{
              background: "#ffffff",
              borderRadius: "15px",
              textAlign: "center",
              marginBottom: "20px",
              "&:hover": {
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                transform: "scale(1.03)",
                backgroundColor: "#bbdefb", // Bright hover color
              },
              transition: "all 0.3s ease",
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div" color="text.primary">
                Create your author profile to share with the world!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default CreateAuthor;
