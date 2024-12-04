import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Paper } from '@mui/material';

const Comments = () => {
  const { postId } = useParams(); // Get postId from the URL
  const [comments, setComments] = useState([]);

  // Fetch comments based on postId
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          Comments for Post {postId}
        </Typography>
        {comments.map((comment) => (
          <Paper key={comment.id} sx={{ padding: 2, marginBottom: 2, width: '100%' }}>
            <Typography variant="h6">{comment.name}</Typography>
            <Typography variant="body2">{comment.body}</Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Comments;
