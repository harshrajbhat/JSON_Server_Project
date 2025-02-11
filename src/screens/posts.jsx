import React, { useState, useEffect, useMemo } from "react";
import { Grid, Card, CardContent, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchData } from "../features/fetchSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const { authors = [], posts = [], loading, error } = useSelector((state) => state.data || {});

  useEffect(() => {
    dispatch(thunkFetchData());
  }, [dispatch]);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [posts, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) {
    return <h1 style={{ textAlign: "center", color: "#1976d2" }}>Loading, please wait...</h1>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;
  }

  if (!posts.length) {
    return <p style={{ textAlign: "center", color: "#666" }}>No posts found.</p>;
  }

  const handlePostClick = (post) => {
    const author = authors.find((author) => author.id === String(post.authorId));
    navigate("/viewpostdetails", { state: { post, author } });
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#e3f2fd", minHeight: "100vh" }}>
      <TextField
        label="Search Posts"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />
      <Button
        startIcon={<NoteAddIcon />}
        sx={{
          color: "#fff",
          fontWeight: "bold",
          fontFamily: "'Poppins', sans-serif",
          backgroundColor: "#2c387e",
          marginBottom: "20px",
          "&:hover": {
            backgroundColor: "#4753d6",
            boxShadow: "0 4px 12px rgba(71, 83, 214, 0.5)",
          },
        }}
        onClick={() => navigate("/createpost")}
      >
        Create Post
      </Button>
      <Grid container spacing={3} justifyContent="center">
        {paginatedPosts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                textAlign: "center",
                padding: "20px",
                background: "#f5f5f5",
                borderRadius: "15px",
                "&:hover": { boxShadow: "0 8px 20px rgba(0,0,0,0.15)", transform: "scale(1.03)" },
                transition: "all 0.3s ease",
              }}
            >
              <ArticleIcon sx={{ fontSize: "50px", color: "#1976d2", margin: "10px auto" }} />
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  <AccountCircleIcon sx={{ fontSize: "16px", marginRight: "5px" }} />
                  {authors.find((author) => author.id === String(post.authorId))?.firstName || "Unknown Author"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comments: {post.numComments} | Likes: {post.numLikes}
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: "10px" }} onClick={() => handlePostClick(post)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button variant="contained" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} sx={{ marginRight: "10px", backgroundColor: "#1976d2" }}>
          Previous
        </Button>
        <Typography variant="body1" sx={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button variant="contained" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} sx={{ marginLeft: "10px", backgroundColor: "#1976d2" }}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Posts;