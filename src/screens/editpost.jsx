import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Card, CardContent } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useLocation, useNavigate } from "react-router-dom";

const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { post } = location.state || {};

  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");
  const [authorId, setAuthorId] = useState(post?.authorId || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setAuthorId(post.authorId);
    }
  }, [post]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !authorId) {
      setErrorMessage("All the fields are required.");
      return;
    }

    const updatedPost = {
      title,
      description,
      authorId: parseInt(authorId),
      datePublished: new Date().toISOString(),
      numLikes: post?.numLikes || 0,
      numComments: post?.numComments || 0,
    };

    try {
      const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        setSuccessMessage("Post updated successfully!");
        setErrorMessage("");
        navigate("/posts"); 
      } else {
        throw new Error("Failed attempt to update post.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={{ backgroundColor: "#e3f2fd" }}>
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
          Edit Post
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
                Edit Post
              </Button>
            </CardContent>
          </Card>
        </form>
      </Container>
    </div>
  );
};

export default EditPost;
