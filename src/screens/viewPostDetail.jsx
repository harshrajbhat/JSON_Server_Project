import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { useLocation, useNavigate } from "react-router-dom";


const PostDetails = () => {
  const [authors, setAuthors] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [likesWithDetails, setLikesWithDetails] = useState([]);
  const [commentsWithDetails, setCommentsWithDetails] = useState([]);
  const [openLikes, setOpenLikes] = useState(false);
  const [openComments, setOpenComments] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { post, author } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorsResponse, commentsResponse, likesResponse] = await Promise.all([
          fetch("http://localhost:3000/authors"),
          fetch("http://localhost:3000/comments"),
          fetch("http://localhost:3000/likes"),
        ]);

        const authorsData = await authorsResponse.json();
        const commentsData = await commentsResponse.json();
        const likesData = await likesResponse.json();

        setAuthors(authorsData);
        setComments(commentsData);
        setLikes(likesData);

        if (post) {
          const filteredLikes = likesData.filter((like) => String(like.postId) === String(post.id));
          const likesDetails = filteredLikes.map((like) => {
            const author = authorsData.find((a) => String(a.id) === String(like.authorId));
            return {
              id: like.id,
              authorName: author ? `${author.firstName} ${author.lastName}` : "Unknown",
              date: like.date || "Unknown Date",
            };
          });
          setLikesWithDetails(likesDetails);

          const filteredComments = commentsData.filter((comment) => String(comment.postId) === String(post.id));
          const commentsDetails = filteredComments.map((comment) => {
            const author = authorsData.find((a) => String(a.id) === String(comment.authorId));
            return {
              id: comment.id,
              commentText: comment.text,
              authorName: author ? `${author.firstName} ${author.lastName}` : "Unknown",
            };
          });
          setCommentsWithDetails(commentsDetails);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [post]);

  if (!post || !author) {
    return <p>No post details available.</p>;
  }

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
        onClick={() => navigate("/editpost", {state:{post}})} 
      >
        Edit Post
      </Button>
      <Card
        sx={{
          maxWidth: 600,
          margin: "auto",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "15px",
          "&:hover": { boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", transform: "scale(1.03)" },
          transition: "all 0.3s ease",
        }}
      >
        <CardContent>
          <Typography variant="h4" component="div" sx={{ color: "#1976d2" }}>
            {post.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {post.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Author:</strong> {author.firstName} {author.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Published:</strong> {new Date(post.datePublished).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Likes:</strong> {post.numLikes}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Comments:</strong> {post.numComments}
          </Typography>
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: "10px" }}
              onClick={() => setOpenLikes(true)}
            >
              View Likes
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenComments(true)}
            >
              View Comments
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Likes Dialog */}
      <Dialog open={openLikes} onClose={() => setOpenLikes(false)}>
        <DialogTitle>Likes</DialogTitle>
        <DialogContent>
          <List>
            {likesWithDetails.map((like) => (
              <ListItem key={like.id}>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={like.authorName} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      {/* Comments*/}
      <Dialog open={openComments} onClose={() => setOpenComments(false)}>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <List>
            {commentsWithDetails.map((comment) => (
              <ListItem key={comment.id}>
                <ListItemAvatar>
                  <Avatar>
                    <ModeCommentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={comment.authorName} secondary={comment.commentText} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostDetails;
