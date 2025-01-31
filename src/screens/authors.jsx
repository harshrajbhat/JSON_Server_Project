import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import useFetch from "../components/fetchdata";
import PersonIcon from "@mui/icons-material/Person3";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useNavigate } from "react-router-dom";

const Authors = () => {
  const { data, error, loading } = useFetch("/db.json");
  const ITEMS_PER_PAGE = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [paginatedAuthors, setPaginatedAuthors] = useState([]);

  useEffect(() => {
    if (data?.authors) {
      setFilteredAuthors(data.authors);
    }
  }, [data]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filteredAuthors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    setPaginatedAuthors(paginated);
  }, [filteredAuthors, currentPage]);

  if (loading) {
    return <h1 style={{ textAlign: "center", color: "#1976d2" }}>Server is loading, please wait...</h1>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>Error: {error.message}</p>;
  }

  if (!data || !data.authors || data.authors.length === 0) {
    return <p style={{ textAlign: "center", color: "#666" }}>No authors found.</p>;
  }

  const totalPages = Math.ceil(filteredAuthors.length / ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleAuthorPostsClick = (author) => {
    navigate(`/authorposts`, { state: { authorId: author.id, authorName: `${author.firstName} ${author.lastName}` } });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = data.authors.filter((author) =>
      `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length === 0) {
      alert("No results found for your search.");
    } else {
      setFilteredAuthors(filtered);
    }
    setCurrentPage(1);
  };

  const AuthorCard = ({ author }) => (
    <Card
      sx={{
        textAlign: "center",
        padding: "20px",
        margin: "10px",
        background: "#f5f5f5",
        borderRadius: "15px",
        "&:hover": { boxShadow: "0 8px 20px rgba(0,0,0,0.15)", transform: "scale(1.03)" },
        transition: "all 0.3s ease",
      }}
    >
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
          Comments: {author.numComments}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Likes: {author.numLikes}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
          onClick={() => handleAuthorPostsClick(author)}
        >
          Show Author Posts
        </Button>
      </CardContent>
    </Card>
  );

  return (
  
    <div style={{ padding: "20px", backgroundColor: "#e3f2fd", minHeight: "100vh" }}>
      <Button
        startIcon={<NoteAddIcon />}
        sx={{
          color: "#fff",
          fontWeight: "bold",
          fontFamily: "'Poppins', sans-serif",
          backgroundColor: "#2c387e",
          marginBottom : "20px",
          "&:hover": {
            backgroundColor: "#4753d6",
            boxShadow: "0 4px 12px rgba(71, 83, 214, 0.5)",
          },
        }}
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
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            marginRight: "10px",
            border: "1px solid #1976d2",
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {paginatedAuthors.map((author) => (
          <Grid item key={author.id}>
            <AuthorCard author={author} />
          </Grid>
        ))}
      </Grid>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          Previous
        </Button>
        <Typography variant="body1" style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
    
  );
};

export default Authors;


