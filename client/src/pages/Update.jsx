import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: null,
    cover: '',
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split('/')[2];

  const handleChange = (e) => {
    setBook(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate('/');
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  console.log(book);

  return (
    <div className='form'>
      <h1>Update the book</h1>
      <input
        type='text'
        placeholder='title'
        name='title'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='desc'
        name='desc'
        onChange={handleChange}
      />
      <input
        type='number'
        placeholder='price'
        name='price'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='cover'
        name='cover'
        onChange={handleChange}
      />
      <button
        className='formButton'
        onClick={handleClick}
      >
        Update
      </button>

      {error && 'Something went wrong!'}

      <Link to='/'>
        See all books
      </Link>
    </div>
  );
};

export default Update;
