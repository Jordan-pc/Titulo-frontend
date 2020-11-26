import React, { useState, useEffect, useContext } from 'react';
import { environment } from '../config/environment';
import { PostContext } from '../context/postContext';
import { Link } from 'react-router-dom';

export const MoreTrafic = () => {
  const [like, setLiked] = useState({});
  const [commented, setCommented] = useState({});

  const { total } = useContext(PostContext);

  const TextNoFound = () => {
    if (like.title && commented.title) {
      return <h5>Publicaciones destacadas</h5>;
    }
    return <p>No se han encontrado publicaciones destacadas</p>;
  };

  const CardsLikeComment = () => {
    if (like.title && commented.title) {
      return (
        <>
          <div className='card border-dark m-1'>
            <div className='card-body'>
              <strong>{like.title}</strong>
              <p>
                <small>Likes: {like.numberLikes}</small>
              </p>
              <Link className='stretched-link' to={'/publications/' + like._id}>
                {' '}
              </Link>
            </div>
          </div>

          <div className='card border-dark m-1'>
            <div className='card-body'>
              <strong>{commented.title}</strong>
              <p>
                <small>Comentarios: {commented.numberComments}</small>
              </p>
              <Link
                className='stretched-link'
                to={'/publications/' + commented._id}
              >
                {' '}
              </Link>
            </div>
          </div>
        </>
      );
    }
    return <></>;
  };

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(environment.API_URL + '/stadistics');
      const publications = await response.json();
      setLiked(publications.mostLiked[0]);
      setCommented(publications.mostCommented[0]);
    };
    getPosts();
  }, []);

  return (
    <>
      <div className='mt-3 mr-3 ml-3 mb-3'>
        <div className='card p-2'>
          <TextNoFound></TextNoFound>
          <CardsLikeComment></CardsLikeComment>
          <p className='m-1'>Número de publicaciones totales: {total}</p>
        </div>
      </div>
    </>
  );
};
