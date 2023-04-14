import React, { useState, useEffect } from 'react';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newBlog, setNewBlog] = useState({ title: '', content: '', category: '' });

  useEffect(() => {
    fetch('https://sinatra-api-2.onrender.com/')
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleBlogSubmit = () => {
    // Add new blog
    fetch('https://sinatra-api-2.onrender.com/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBlog)
    })
      .then(response => response.json())
      .then(addedBlog => {
        setBlogs([addedBlog, ...blogs]); // Use unshift to add the newly created blog at the top
        setNewBlog({ title: '', content: '', category: '' });
      })
      .catch(error => console.error('Error adding blog:', error));
  };
  

  const handleBlogDelete = (id) => {
    // Delete blog
    fetch(`https://sinatra-api-2.onrender.com/blogs/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id));
      })
      .catch(error => console.error('Error deleting blog:', error));
  };

  // Filter blogs based on selected category
  const filteredBlogs = selectedCategory
    ? blogs.filter(blog => blog.category === selectedCategory)
    : blogs;

  return (
    <div>
      <h1>Blog List</h1>
      <div>
        <button onClick={() => handleCategoryFilter('New')}>New</button>
        <button onClick={() => handleCategoryFilter('')}>All</button>
      </div>
      <form onSubmit={handleBlogSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={newBlog.title} onChange={handleInputChange} />
        </label>
        <label>
          Content:
          <textarea name="content" value={newBlog.content} onChange={handleInputChange} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={newBlog.category} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Blog</button>
      </form>
      <ul>
        {filteredBlogs.map(blog => (
          <li key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p>Category: {blog.category}</p>
            <button onClick={() => handleBlogDelete(blog.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
