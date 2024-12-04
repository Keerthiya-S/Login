import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = () => axios.get(`${API_URL}/posts`);
export const getComments = (postId) => axios.get(`${API_URL}/posts/${postId}/comments`);
