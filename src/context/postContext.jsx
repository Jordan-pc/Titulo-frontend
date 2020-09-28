import React, { createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:3000/publications');
      const publications = await response.json();
      setPosts(publications);
    };
    getPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {props.children}
    </PostContext.Provider>
  );
};
