import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Authors from "./screens/authors";
import Posts from "./screens/posts";
import Users from "./screens/users";
import AuthorPost from "./screens/authorpost";
import Home from "./screens/home";
import TopCommentedPosts from "./screens/topComment";
import ViewPostDetails from "./screens/viewPostDetail";
import CreatePost from "./screens/createpost";
import CreateAuthor from "./screens/createauthor";
import EditPost from "./screens/editpost";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/viewpostdetails" element={<ViewPostDetails />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/users" element={<Users />} />
        <Route path="/authorposts" element={<AuthorPost />} />
        <Route path="/authorposts/comments" element={<TopCommentedPosts />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/createauthor" element={<CreateAuthor />} />
        <Route path="/editpost" element={<EditPost />} />
        
        
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
