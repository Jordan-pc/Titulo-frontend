import React, { createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:3000/publications');
      const publications = await response.json();
      setPosts(publications);
    };
    getPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, filtered, setFiltered }}>
      {props.children}
    </PostContext.Provider>
  );
};
