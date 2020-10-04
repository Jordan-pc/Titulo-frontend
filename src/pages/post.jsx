import React, { useState, useEffect } from 'react';

export const Post = (props) => {
  const [Publication, setPublication] = useState({});
  const [publishedBy, setPublishedBy] = useState({});
  const [comments, setComments] = useState([]);

  const Comment = () => {
    if (comments.length !== 0) {
      return <h3 className='ml-5'>Comentarios</h3>;
    }
    return <></>;
  };

  const openUrl = () => {
    if (
      Publication.url.includes('https://') ||
      Publication.url.includes('http://')
    ) {
      window.open(Publication.url);
    } else {
      window.open('http://' + Publication.url);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const comentarios = [];
      const response = await fetch(
        'http://localhost:3000/publications/' + props.match.params.id
      );
      const post = await response.json();
      if (post.message) {
        window.location = '/';
        return;
      }
      post.comments.forEach((element) => {
        comentarios.push(element.content);
      });
      setPublishedBy(post.publishedBy);
      setPublication(post);
      setComments(comentarios);
    };
    getPost();
  }, [props.match.params.id]);

  return (
    <>
      <div className='container mt-5'>
        <div className='jumbotron bg-white'>
          <h2 className='display-5'>{Publication.title}</h2>
          <div className='row'>
            <p className='text-muted ml-3'>
              Categorias: {Publication.categorys + ' '}
            </p>
            <p className='text-muted ml-3'>Tags: {Publication.tags + ' '}</p>
          </div>

          <p className='text-dark'>{Publication.content}</p>
          <button
            className='btn btn-link text-decoration-none'
            onClick={openUrl}
          >
            {Publication.url}
          </button>
          <div className='mt-3'>
            <p className='text-muted'>Publicado por: {publishedBy.name}</p>
          </div>
          <a className='btn btn-primary' href='/' role='button'>
            Volver
          </a>
        </div>
      </div>

      <Comment></Comment>
      {comments.map((comment, index) => (
        <div className='w-75 card ml-5 mr-5 mb-2 bg-light' key={index}>
          <div className='card-body'>{comment}</div>
        </div>
      ))}
    </>
  );
};
