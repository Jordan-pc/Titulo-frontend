import React, { useState, useEffect, useContext } from 'react';
import { Comment } from '../components/comment';
import { environment } from '../config/environment';
import { BiLike, BiDislike } from 'react-icons/bi';
import { PostContext } from '../context/postContext';
import { Link } from 'react-router-dom';

export const Post = (props) => {
  const [Publication, setPublication] = useState({
    url: '',
    categorys: [],
    tags: []
  });
  const [publishedBy, setPublishedBy] = useState({});
  const [comments, setComments] = useState([
    {
      _id: '',
      content: '',
      commentedBy: ''
    }
  ]);
  const [ID, setId] = useState();
  const [errors, setErrors] = useState([]);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const { setPosts, setTotal, setFiltered } = useContext(PostContext);

  const CommentTitle = () => {
    const id = sessionStorage.getItem('id');
    if (comments.length !== 0) {
      return <h3 className='ml-5'>Comentarios</h3>;
    }
    if (id) {
      return <h3 className='ml-5'>Sé el primero en comentar!</h3>;
    }
    return <></>;
  };

  const ShowComments = () => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    return (
      <>
        {comments.map((comment, index) => {
          if (comment.commentedBy === id) {
            return (
              <div className='card ml-3 mr-3 mb-2 bg-light' key={comment._id}>
                <form className='p-3'>
                  <div className='form-group'>
                    <textarea
                      id='content'
                      type='text'
                      className='form-control'
                      name='content'
                      defaultValue={comment.content}
                      onChange={(event) => {
                        comments[index].content = event.target.value;
                        console.log(comments[index]);
                      }}
                    />
                  </div>
                  <button
                    className='btn btn-primary'
                    onClick={async () => {
                      const response = await fetch(
                        environment.API_URL +
                          '/publications/comment/change/' +
                          comment._id,
                        {
                          method: 'put',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: sessionStorage.getItem('token')
                          },
                          body: JSON.stringify({
                            content:
                              sessionStorage.getItem('name') +
                              ': ' +
                              comment.content.replace(
                                sessionStorage.getItem('name') + ': ',
                                ''
                              )
                          })
                        }
                      );
                      const status = await response.json();
                      if (response.status !== 200) {
                        console.log(status.message);
                      }
                    }}
                  >
                    Guardar
                  </button>
                  <button
                    className='btn btn-danger float-right'
                    onClick={async () => {
                      const response = await fetch(
                        environment.API_URL + '/commentdelete/' + comment._id,
                        {
                          method: 'delete',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: sessionStorage.getItem('token')
                          }
                        }
                      );
                      const status = await response.json();
                      if (response.status !== 200) {
                        console.log(status.message);
                      }
                    }}
                  >
                    Borrar
                  </button>
                </form>
              </div>
            );
          } else if (role === 'ADMIN') {
            return (
              <div className='card ml-3 mr-3 mb-2 bg-light' key={comment._id}>
                <div className='card-body'>{comment.content}</div>
                <div>
                  <button
                    className='btn btn-danger mb-3 mr-3 float-right'
                    onClick={async () => {
                      const response = await fetch(
                        environment.API_URL + '/commentdelete/' + comment._id,
                        {
                          method: 'delete',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: sessionStorage.getItem('token')
                          }
                        }
                      );
                      const status = await response.json();
                      if (response.status !== 200) {
                        console.log(status.message);
                      }
                      window.location.reload();
                    }}
                  >
                    Borrar
                  </button>
                </div>
              </div>
            );
          }
          return (
            <div className='card ml-3 mr-3 mb-2 bg-light' key={comment._id}>
              <div className='card-body'>{comment.content}</div>
            </div>
          );
        })}
      </>
    );
  };

  const DoComment = () => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (id || role === 'ADMIN') {
      return <Comment id={props.match.params.id}></Comment>;
    }
    return <></>;
  };

  const ShowUrl = () => {
    const url = Publication.url;
    const urlParts = url
      .replace('http://', '')
      .replace('https://', '')
      .split(/[/?#]/);
    return (
      // eslint-disable-next-line
      <a className='text-decoration-none' onClick={openUrl}>
        Ir a: {urlParts[0]}
      </a>
    );
  };

  const ShowContent = () => {
    console.log(Publication);
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
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if ((id && id === publishedBy._id) || role === 'ADMIN') {
      return (
        <a className='btn btn-primary mt-3 mr-3' href={ID} role='button'>
          Editar
        </a>
      );
    }
    return <></>;
  };

  const DeleteButton = () => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if ((id && id === publishedBy._id) || role === 'ADMIN') {
      return (
        <button
          className='btn btn-danger mt-3 float-right'
          onClick={sendBorrar}
        >
          Borrar
        </button>
      );
    }
    return <></>;
  };

  const ReportButton = () => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (id && id !== publishedBy._id && role !== 'ADMIN') {
      return (
        <button
          className='btn btn-danger mt-3 float-right'
          onClick={() => {
            window.location = '/reportar/' + ID.replace('modify/', '');
          }}
        >
          Reportar publicación
        </button>
      );
    }
    return <></>;
  };

  const sendBorrar = async () => {
    const response = await fetch(
      environment.API_URL + '/publications/' + props.match.params.id,
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
        }
      }
    );
    const status = await response.json();
    if (response.status !== 200) {
      if (status.message) {
        setErrors([status.message]);
        return;
      } else if (status.errors) {
        const err = [];
        status.errors.map((e) => {
          const error = e.msg;
          const param = e.param;
          err.push(`-${error} en el campo ${param} `);
          return err;
        });
        setErrors([err]);
        return;
      }
    }
    window.location = '/';
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

  const Fecha = (props) => {
    const date = new Date(props.createdAt);
    return <p>Fecha de publicación: {date.toLocaleDateString()}</p>;
  };

  const LikeButton = () => {
    if (!liked)
      return (
        <div>
          <button
            className='ml-3 bg-white'
            style={{ padding: '0', border: 'none', background: 'none' }}
            onClick={likeFunction}
            disabled={!sessionStorage.getItem('id')}
          >
            <BiLike></BiLike>
          </button>
        </div>
      );
    return (
      <div>
        <button
          className='ml-3 bg-white'
          style={{ padding: '0', border: 'none', background: 'none' }}
          onClick={likeFunction}
          disabled={!sessionStorage.getItem('id')}
        >
          <BiDislike></BiDislike>
        </button>
      </div>
    );
  };

  const likeFunction = async () => {
    setLiked(!liked);
    if (!liked) {
      setLikes(likes + 1);
      const data = {
        state: 'like'
      };
      const response = await fetch(
        environment.API_URL + '/like/' + props.match.params.id,
        {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('token')
          },
          body: JSON.stringify(data)
        }
      );
      if (response.status !== 200) {
        setLiked(!liked);
        setLikes(likes - 1);
      }
    } else {
      setLikes(likes - 1);
      const data = {
        state: 'dislike'
      };
      const response = await fetch(
        environment.API_URL + '/like/' + props.match.params.id,
        {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('token')
          },
          body: JSON.stringify(data)
        }
      );
      if (response.status !== 200) {
        setLiked(!liked);
        setLikes(likes + 1);
      }
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const comentarios = [];
      const response = await fetch(
        environment.API_URL + '/publications/' + props.match.params.id
      );
      const post = await response.json();
      if (post.message) {
        window.location = '/';
        return;
      }
      post.comments.forEach((element) => {
        comentarios.push(element);
      });
      const contains = post.likes.includes(sessionStorage.getItem('id'));
      setLiked(contains);
      setPublishedBy(post.publishedBy);
      setPublication(post);
      setComments(comentarios);
      setId('modify/' + props.match.params.id);
      setLikes(post.likes.length);
    };
    getPost();
  }, [props.match.params.id]);

  return (
    <>
      <div className='container mt-5'>
        <div className='jumbotron bg-white'>
          <h2 className='display-5'>{Publication.title}</h2>
          <div className='row'>
            <p className='text-muted ml-3'>Categorias: </p>
            {Publication.categorys.map((cat, index) => (
              <Link
                className='text-muted ml-1'
                key={index}
                onClick={async () => {
                  const response = await fetch(
                    environment.API_URL + '/publications/filter',
                    {
                      method: 'post',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ categorys: [cat] })
                    }
                  );
                  const publications = await response.json();
                  setPosts(publications.posts);
                  setTotal([publications.total]);
                  setFiltered(true);
                }}
                to='/'
              >
                {cat}
              </Link>
            ))}
            <p className='text-muted ml-3'>Tags: </p>
            {Publication.tags.map((tag, index) => (
              <Link
                className='text-muted ml-1'
                key={index}
                onClick={async () => {
                  const response = await fetch(
                    environment.API_URL + '/publications/filter',
                    {
                      method: 'post',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ tags: [tag] })
                    }
                  );
                  const publications = await response.json();
                  setPosts(publications.posts);
                  setTotal([publications.total]);
                  setFiltered(true);
                }}
                to='/'
              >
                {tag}
              </Link>
            ))}
          </div>
          <ShowContent></ShowContent>
          <ShowUrl></ShowUrl>
          <div className='text-muted mt-3'>
            <div className='row'>
              <p className='ml-3 mr-2'>Publicado por: {publishedBy.name}</p>
              <Fecha createdAt={Publication.createdAt}></Fecha>
            </div>
          </div>
          <div className='row'>
            <p className='ml-3 text-muted'>Likes: {likes}</p>
            <LikeButton></LikeButton>
          </div>

          {errors.map((error, index) => (
            <p className='text-danger text-break text-justify' key={index}>
              Error: {error}
            </p>
          ))}
          <EditButton></EditButton>
          <button
            className='btn btn-primary mt-3 ml-3'
            onClick={() => {
              window.location = '/';
            }}
          >
            Volver al inicio
          </button>
          <DeleteButton></DeleteButton>
          <ReportButton></ReportButton>
        </div>
      </div>

      <div className='container'>
        <CommentTitle></CommentTitle>
        <DoComment></DoComment>
        <ShowComments></ShowComments>
      </div>
    </>
  );
};
