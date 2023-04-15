// src/api.js

import API_ENDPOINT from './config'; // Import the API endpoint

// Function to handle API response
const handleResponse = async (response) => {
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error || 'Failed to fetch data from API');
  }
};

// Create a new blog
export const createBlog = async (blogData) => {
  const response = await fetch(`${API_ENDPOINT}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogData),
  });

  return handleResponse(response);
};

// Get all blogs
export const getBlogs = async () => {
  const response = await fetch(`${API_ENDPOINT}/blogs`);
  return handleResponse(response);
};

// Get a specific blog
export const getBlog = async (blogId) => {
  const response = await fetch(`${API_ENDPOINT}/blogs/${blogId}`);
  return handleResponse(response);
};

// Update a blog
export const updateBlog = async (blogId, blogData) => {
  const response = await fetch(`${API_ENDPOINT}/blogs/${blogId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogData),
  });

  return handleResponse(response);
};

// Delete a blog
export const deleteBlog = async (blogId) => {
  const response = await fetch(`${API_ENDPOINT}/blogs/${blogId}`, {
    method: 'DELETE',
  });

  return handleResponse(response);
};
