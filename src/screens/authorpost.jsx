import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import useFetch from "../components/fetchdata";

const AuthorPost = () => {
  const location = useLocation();
  const { authorId, authorName } = location.state || {};
  const { data, error, loading } = useFetch("/db.json");

  if (loading) {
    return <h1 style={{ textAlign: "center", color: "#1976d2" }}>Loading, please wait...</h1>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>Error: {error.message}</p>;
  }

  if (!data || !data.posts || data.posts.length === 0) {
    return <p style={{ textAlign: "center", color: "#666" }}>No posts found.</p>;
  }

  // Filter selected author
  const filteredPosts = data.posts.filter(
    (post) => Number(post.authorId) === Number(authorId)
  );

  // Sort top 5 most liked posts
  const topLikedPosts = filteredPosts
    .sort((a, b) => b.numLikes - a.numLikes)
    .slice(0, 5);

  return (
    <div style={{ padding: "20px", backgroundColor: "#e3f2fd", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px" }}>
        Top 5 Most Liked Posts by {authorName || "Author"}
      </Typography>
      <Link to="/authorposts/comments" state={{ authorId, authorName }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ display: "block", margin: "0 auto 20px" }}
        >
          View Top Commented Posts
        </Button>
      </Link>
      {topLikedPosts.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {topLikedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Grid>
      ) : (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "#666", marginTop: "20px" }}
        >
          No posts available for this author.
        </Typography>
      )}
    </div>
  );
};

const PostCard = ({ post }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleToggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease",
          "&:hover": { boxShadow: "0 8px 20px rgba(0,0,0,0.2)", transform: "scale(1.05)" },
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
            sx={{ textAlign: "left" }}
          >
            {showFullDescription
              ? post.description
              : `${post.description.slice(0, 100)}${post.description.length > 100 ? "..." : ""}`}
          </Typography>
          <Button
            size="small"
            onClick={handleToggleDescription}
            variant="contained"
            sx={{ marginBottom: "10px", backgroundColor: "#1976d2" }}
          >
            {showFullDescription ? "Hide Description" : "Show Description"}
          </Button>
          <Typography variant="body2" color="text.secondary">
            <strong>Published:</strong> {new Date(post.datePublished).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Comments:</strong> {post.numComments}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Likes:</strong> {post.numLikes}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AuthorPost;
