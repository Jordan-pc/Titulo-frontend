import React, { useState, useEffect } from 'react';

export const Post = (props) => {
  const [Publication, setPublication] = useState({});
  const [publishedBy, setPublishedBy] = useState({});
  const [comments, setComments] = useState([]);
  const [ID, setId] = useState();

  const Comment = () => {
    if (comments.length !== 0) {
      return <h3 className='ml-5'>Comentarios</h3>;
    }
    return <></>;
  };

  const ShowContent = () => {
    if (Publication.content) {
      const text = Publication.content.split('\n');
      return (
        <>
          {text.map((item, index) => (
            <p className='text-dark' key={index}>
              {item}
            </p>
          ))}
        </>
      );
    }
    return <></>;
  };

  const EditButton = () => {
    const id = localStorage.getItem('id');
    if (id && id === publishedBy._id) {
      return (
        <a className='btn btn-primary mt-3 mr-3' href={ID} role='button'>
          Editar
        </a>
      );
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
      setId('modify/' + props.match.params.id);
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

          <ShowContent></ShowContent>

          <button
            className='btn btn-link text-decoration-none'
            onClick={openUrl}
          >
            {Publication.url}
          </button>
          <div className='mt-3'>
            <p className='text-muted'>Publicado por: {publishedBy.name}</p>
          </div>
          <EditButton></EditButton>
          <a className='btn btn-primary mt-3' href='/' role='button'>
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
