import React, { createContext, useState, useEffect } from 'react';
import { environment } from '../config/environment';

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(environment.API_URL + '/publications');
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
