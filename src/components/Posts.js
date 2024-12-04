
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    
    fetchPosts();
  }, []);

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          Posts
        </Typography>
        {posts.map((post) => (
          <Paper key={post.id} sx={{ padding: 2, marginBottom: 2, width: '100%' }}>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2">{post.body}</Typography>
            <Link to={`/comments/${post.id}`}>
              <Button variant="outlined" color="primary" sx={{ marginTop: 2 }}>
                View Comments
              </Button>
            </Link>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Posts;
