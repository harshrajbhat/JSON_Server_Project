import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person3";
import { Link } from "react-router-dom";
import useFetch from "../components/fetchdata";

const Home = () => {
  const { data, error, loading } = useFetch("/db.json");

  if (loading) {
    return (
      <h1 style={{ textAlign: "center", color: "#1976d2" }}>Loading, please wait...</h1>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>Error: {error.message}</p>
    );
  }

  if (!data || !data.authors || !data.posts || data.authors.length === 0 || data.posts.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#666" }}>
        No authors or posts found.
      </p>
    );
  }

  const getRandomItems = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomAuthors = getRandomItems(data.authors, 3);
  const randomPosts = getRandomItems(data.posts, 3);

  const cardStyles = {
    textAlign: "center",
    padding: "20px",
    margin: "10px",
    background: "#f5f5f5",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
      transform: "scale(1.03)",
    },
    transition: "all 0.3s ease",
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#e3f2fd", minHeight: "100vh" }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ color: "#1976d2" }}>
        Welcome to the Blog Platform
      </Typography>
      <Typography variant="h5" align="center" gutterBottom sx={{ color: "#1976d2" }}>
        Discover Authors and Their Work
      </Typography>

      {/* Featured Authors */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: "30px", color: "#1976d2" }}>
        Featured Authors
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {randomAuthors.map((author) => (
          <Grid item key={author.id}>
            <Card sx={cardStyles}>
              <PersonIcon
                sx={{
                  fontSize: "80px",
                  color: "#1976d2",
                  margin: "20px auto",
                }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {author.firstName} {author.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {author.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Posts: {author.numPosts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Likes: {author.numLikes}
                </Typography>
                <Link
                  to={`/authorposts`}
                  state={{ authorId: author.id, authorName: `${author.firstName} ${author.lastName}` }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px" }}
                  >
                    View Author Posts
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Featured Posts */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: "30px", color: "#1976d2" }}>
        Recent Posts
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {randomPosts.map((post) => (
          <Grid item key={post.id}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {post.description.length > 100
                    ? post.description.slice(0, 100) + "..."
                    : post.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Published: {new Date(post.datePublished).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comments: {post.numComments}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Likes: {post.numLikes}
                </Typography>
                <Link
                  to="/viewpostdetails"
                  state={{
                    post: post,
                    author: data.authors.find((a) => String(a.id) === String(post.authorId)),
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px" }}
                  >
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
