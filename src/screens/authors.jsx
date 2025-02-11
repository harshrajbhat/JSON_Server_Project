import React, { useState, useEffect, useMemo } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person3";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchData, selectAuthors } from "../features/fetchSlice";

const Authors = () => {
  const ITEMS_PER_PAGE = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authors = useSelector(selectAuthors);
  const { loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(thunkFetchData());
  }, [dispatch]);

  const filteredAuthors = useMemo(() => {
    return authors.filter((author) =>
      `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [authors, searchQuery]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAuthors = useMemo(
    () => filteredAuthors.slice(startIndex, startIndex + ITEMS_PER_PAGE),
    [filteredAuthors, startIndex]
  );

  const totalPages = Math.ceil(filteredAuthors.length / ITEMS_PER_PAGE);

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
  };

  const handleAuthorPostsClick = (author) => {
    navigate(`/authorposts/${author.id}`, { state: { authorName: `${author.firstName} ${author.lastName}` } });
  };

  if (loading) return <h1 style={{ textAlign: "center", color: "#1976d2" }}>Server is loading, please wait...</h1>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;
  if (!authors.length) return <p style={{ textAlign: "center", color: "#666" }}>No authors found.</p>;

  return (
    <div style={{ padding: "20px", backgroundColor: "#e3f2fd", minHeight: "100vh" }}>
      <Button
        startIcon={<NoteAddIcon />}
        sx={{ color: "#fff", fontWeight: "bold", backgroundColor: "#2c387e", marginBottom: "20px" }}
        onClick={() => navigate("/createauthor")}
      >
        Create Author
      </Button>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search authors by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "10px", width: "300px", borderRadius: "5px", border: "1px solid #1976d2" }}
        />
        <Button type="submit" variant="contained" color="primary">Search</Button>
      </form>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {paginatedAuthors.map((author) => (
          <Grid item key={author.id}>
            <Card sx={{ textAlign: "center", padding: "20px", background: "#f5f5f5", borderRadius: "15px" }}>
              <PersonIcon sx={{ fontSize: "80px", color: "#1976d2" }} />
              <CardContent>
                <Typography variant="h6">{author.firstName} {author.lastName}</Typography>
                <Typography variant="body2" color="text.secondary">Phone: {author.phone}</Typography>
                <Typography variant="body2" color="text.secondary">Posts: {author.numPosts}</Typography>
                <Typography variant="body2" color="text.secondary">Comments: {author.numComments}</Typography>
                <Typography variant="body2" color="text.secondary">Likes: {author.numLikes}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleAuthorPostsClick(author)}>
                  Show Author Posts
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</Button>
        <Typography variant="body1" style={{ margin: "0 10px" }}>Page {currentPage} of {totalPages}</Typography>
        <Button variant="contained" color="primary" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</Button>
      </div>
    </div>
  );
};

export default Authors;