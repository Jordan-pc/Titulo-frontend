import React, { useState, useEffect } from 'react';
import { environment } from '../config/environment';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

export const Stadistics = () => {
  const [liked, setLiked] = useState([]);
  const [commented, setCommented] = useState([]);
  // eslint-disable-next-line
  const [data, setData] = useState({});
  const [other, setOther] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(environment.API_URL + '/stadistics');
      const publications = await response.json();
      setLiked(publications.mostLiked);
      setCommented(publications.mostCommented);
      setData({
        labels: ['001. ', '002. ', '003. ', '004. ', '005. '],
        datasets: [
          {
            barPercentage: 0.7,
            label: 'Likes',
            data: [
              publications.mostLiked[0].numberLikes,
              publications.mostLiked[1].numberLikes,
              publications.mostLiked[2].numberLikes,
              publications.mostLiked[3].numberLikes,
              publications.mostLiked[4].numberLikes
            ],
            backgroundColor: [
              'rgba(255,99,132,0.6)',
              'rgba(54,162,234,0.6)',
              'rgba(255,206,86,0.6)',
              'rgba(123,0,40,0.6)',
              'rgba(153,102,255,0.6)'
            ]
          }
        ]
      });
      setOther({
        labels: ['001. ', '002. ', '003. ', '004. ', '005. '],
        datasets: [
          {
            barPercentage: 0.7,
            label: 'Comentarios',
            data: [
              publications.mostCommented[0].numberComments,
              publications.mostCommented[1].numberComments,
              publications.mostCommented[2].numberComments,
              publications.mostCommented[3].numberComments,
              publications.mostCommented[4].numberComments
            ],
            backgroundColor: [
              'rgba(50,99,132,0.6)',
              'rgba(54,162,234,0.6)',
              'rgba(255,206,86,0.6)',
              'rgba(123,0,40,0.6)',
              'rgba(153,102,255,0.6)'
            ]
          }
        ]
      });
    };
    getPosts();
  }, []);

  return (
    <div className='card m-3'>
      <div className='card-body'>
        <h4 className='card-title'>Estadisticas</h4>
        <div className='m-1 row'>
          <div className='col'>
            <p>Publicaciones con más likes:</p>
            {liked.map((post, index) => (
              <div className='mb-2 card card-body' key={post._id}>
                00{index + 1}. {post.title} - cantidad de likes:{' '}
                {post.numberLikes}
                <Link
                  className='stretched-link'
                  to={'/publications/' + post._id}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  {' '}
                </Link>
              </div>
            ))}
          </div>
          <div className='col'>
            <p>Publicaciones más comentadas:</p>
            {commented.map((post, index) => (
              <div className='mb-2 card card-body' key={post._id}>
                00{index + 1}. {post.title} - cantidad de comentarios:{' '}
                {post.numberComments}
                <Link
                  className='stretched-link'
                  to={'/publications/' + post._id}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  {' '}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className='mb-3 mx-auto' style={{ maxWidth: '700px' }}>
          <Bar
            data={data}
            options={{
              legend: {
                display: true,
                position: 'bottom'
              },
              title: {
                display: true,
                text: 'Publicaciones con más likes',
                fontSize: 16
              }
            }}
          ></Bar>
        </div>
        <div className='mb-3 mx-auto' style={{ maxWidth: '700px' }}>
          <Bar
            data={other}
            options={{
              legend: {
                display: true,
                position: 'bottom'
              },
              title: {
                display: true,
                text: 'Publicaciones más comentadas',
                fontSize: 16
              }
            }}
          ></Bar>
        </div>
      </div>
    </div>
  );
};
