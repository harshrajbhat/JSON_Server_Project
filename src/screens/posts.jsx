import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import useFetch from "../components/fetchdata";

const Posts = () => {
  const { data: postData, error: postError, loading: postLoading } = useFetch(
    "http://localhost:3000/posts"
  );
  const { data: authorsData, error: authorsError, loading: authorsLoading } = useFetch(
    "http://localhost:3000/authors"
  );

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const navigate = useNavigate();

  useEffect(() => {
    if (postData?.length) {
      setFilteredPosts(postData);
    }
  }, [postData]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    setPaginatedPosts(paginated);
  }, [filteredPosts, currentPage]);

  if (postLoading || authorsLoading) {
    return <h1 style={{ textAlign: "center", color: "#1976d2" }}>Loading, please wait...</h1>;
  }

  if (postError || authorsError) {
    return <p style={{ textAlign: "center", color: "red" }}>Error: {postError?.message || authorsError?.message}</p>;
  }

  if (!postData?.length) {
    return <p style={{ textAlign: "center", color: "#666" }}>No posts found.</p>;
  }

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePostClick = (post) => {
    const author = authorsData.find((author) => author.id === String(post.authorId));
    navigate("/viewpostdetails", { state: { post, author } });
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = postData.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const PostCard = ({ post }) => {
    const author = authorsData.find((author) => author.id === String(post.authorId));
    return (
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
            {author ? `${author.firstName} ${author.lastName}` : "Unknown Author"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comments: {post.numComments} | Likes: {post.numLikes}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "10px" }}
            onClick={() => handlePostClick(post)}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#e3f2fd", minHeight: "100vh" }}>
      <TextField
        label="Search Posts"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
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
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          sx={{ marginRight: "10px", backgroundColor: "#1976d2" }}
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          sx={{ marginLeft: "10px", backgroundColor: "#1976d2" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Posts;
