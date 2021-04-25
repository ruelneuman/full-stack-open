import React from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = ({ addNew }) => {
  const [content, contentReset] = useField('content');
  const [author, authorReset] = useField('author');
  const [info, infoReset] = useField('info', 'url');

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });

    history.push('/');
  };

  const resetFields = () => {
    contentReset();
    authorReset();
    infoReset();
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
        <button type="submit">create</button>
        <button type="button" onClick={resetFields}>reset</button>
      </form>
    </div>
  );

};

export default CreateNew;