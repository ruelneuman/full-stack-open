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
      content: content.fieldProps.value,
      author: author.fieldProps.value,
      info: info.fieldProps.value,
      votes: 0
    });

    history.push('/');
  };

  const resetFields = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.fieldProps} />
        </div>
        <div>
          author
          <input {...author.fieldProps} />
        </div>
        <div>
          url for more info
          <input {...info.fieldProps} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetFields}>reset</button>
      </form>
    </div>
  );

};

export default CreateNew;