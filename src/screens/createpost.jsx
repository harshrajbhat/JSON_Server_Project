import React, { useState } from "react";
import { TextField, Button, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox"; // Icon for Create Post

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !authorId) {
      setErrorMessage("All fields are required.");
      return;
    }

    const newPost = {
      title,
      description,
      authorId: parseInt(authorId), // Assuming authorId should be an integer
      datePublished: new Date().toISOString(), // Adding the current date as published date
      numLikes: 0,
      numComments: 0,
    };

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        setSuccessMessage("Post created successfully!");
        setTitle("");
        setDescription("");
        setAuthorId("");
      } else {
        throw new Error("Failed to create post.");
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
        Create New Post
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
            //   backgroundColor: "#bbdefb", // Bright hover color
            },
            transition: "all 0.3s ease",
          }}
        >
          <CardContent>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Author ID"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
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
              Create Post
            </Button>
          </CardContent>
        </Card>
      </form>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Card
            sx={{
            //   padding: "20px",
              background: "#ffffff",
              borderRadius: "15px",
              textAlign: "center",
              marginBottom:"20px",
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
                Create your post to share with the world!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default CreatePost;
