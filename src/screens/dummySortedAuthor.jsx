import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import useFetch from "../components/fetchdata";
import Person3Icon from '@mui/icons-material/Person3';

const sortedAuthors = () => {
  const { data, error, loading } = useFetch("/db.json");
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedAuthors, setSortedAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (data && data.authors) {
      setSortedAuthors(data.authors);
    }
  }, [data]);

  if (loading) {
    return <h1>Server in Loading State, Please wait !!!!</h1>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.authors || data.authors.length === 0) {
    return <p>No authors found.</p>;
  }

  const authors = data.authors;
  const totalPages = Math.ceil(sortedAuthors.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredAuthors = authors.filter((author) =>
      `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortedAuthors(filteredAuthors);
    setCurrentPage(1);
  };

  const handleSort = (criteria) => {
    const sorted = [...sortedAuthors].sort((a, b) => {
      if (criteria === "name") {
        return a.firstName.localeCompare(b.firstName);
      } else if (criteria === "posts") {
        return b.numPosts - a.numPosts;
      } else if (criteria === "likes") {
        return b.numLikes - a.numLikes;
      }
      return 0;
    });
    setSortedAuthors(sorted);
    setCurrentPage(1);
  };

  const currentAuthors = sortedAuthors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const AuthorCard = ({ author }) => (
    <Card sx={{ maxWidth: 300, margin: "10px", padding: "10px" }}>
      <Person3Icon fontSize="large" />
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
      </CardContent>
    </Card>
  );

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search authors by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "10px", width: "300px", borderRadius: "5px", marginRight: "10px" }}
        />
        <Button type="submit" variant="contained" color="primary">Search</Button>
      </form>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button variant="contained" onClick={() => handleSort("name")} style={{ margin: "5px" }}>Sort by Name</Button>
        <Button variant="contained" onClick={() => handleSort("posts")} style={{ margin: "5px" }}>Sort by Posts</Button>
        <Button variant="contained" onClick={() => handleSort("likes")} style={{ margin: "5px" }}>Sort by Likes</Button>
      </div>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {currentAuthors.map((author) => (
          <Grid item key={author.id}>
            <AuthorCard author={author} />
          </Grid>
        ))}
      </Grid>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          style={{ margin: "5px" }}
        >
          Previous
        </Button>
        <Typography variant="body1" style={{ margin: "10px" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          style={{ margin: "5px" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default sortedAuthors;
