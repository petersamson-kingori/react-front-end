import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const BlogDetail = ({ match }) => {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch blog details from the API based on the URL parameter
    fetch(`/posts/${match.params.id}`)
      .then(response => response.json())
      .then(data => setBlog(data))
      .catch(error => {
        console.error('Failed to fetch blog details:', error);
      });
  }, [match.params.id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Route path="/posts/:id" component={BlogDetail} />
    </Router>
  );
};

export default App;