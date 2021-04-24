import React from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = ({ addNew }) => {
  const content = useField('content');
  const author = useField('author');
  const info = useField('info', 'url');

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    addNew({
      content,
      author,
      info,
      votes: 0
    });

    history.push('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  );

};

export default CreateNew;