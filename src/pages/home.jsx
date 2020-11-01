import React, { useState, useContext } from 'react';
import { PostContext } from '../context/postContext';

import { Card } from '../components/card';
import { Filter } from '../components/filter';

export const Home = () => {
  const [next, setNext] = useState(false);
  let [page, setPage] = useState(1);

  const { setPosts, filtered } = useContext(PostContext);

  const getPosts = async () => {
    const response = await fetch(
      'http://localhost:3000/publications?page=' + page
    );
    const publications = await response.json();
    setPosts(publications);
    setNext(false);
    if (publications.length < 5) {
      setNext(true);
    }
  };

  return (
    <div className='row no-gutters'>
      <div className='col-md-8'>
        <Card></Card>
      </div>
      <div className='col-md-4'>
        <Filter></Filter>
      </div>
      <div className='row no-gutters'>
        <button
          className='btn btn-light m-3'
          disabled={page === 1 || filtered}
          onClick={async () => {
            if (page > 1) {
              page = page - 1;
              setPage(page);
            }
            await getPosts();
          }}
        >
          Anterior
        </button>
        <button
          className='btn btn-light m-3'
          disabled={next || filtered}
          onClick={async () => {
            page = page + 1;
            setPage(page);
            await getPosts();
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
