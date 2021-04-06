import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlogForm from './AddBlogForm';

describe('<AddBlogForm />', () => {
  let component;

  const blogObject = {
    title: 'Example Blog',
    author: 'Jane Doe',
    url: 'http://www.example.com/blog',
    likes: 0,
  };

  const mockAddBlog = jest.fn();

  beforeEach(() => {
    component = render(
      <AddBlogForm addBlog={mockAddBlog} />
    );
  });

  test('calls the addBlog fn with the correct details during a submit event', () => {
    const form = component.container.querySelector('form');
    const titleInput = component.getByLabelText(/title/i);
    const authorInput = component.getByLabelText(/author/i);
    const urlInput = component.getByLabelText(/url/i);

    fireEvent.change(titleInput, {
      target: { value: blogObject.title },
    });

    fireEvent.change(authorInput, {
      target: { value: blogObject.author },
    });

    fireEvent.change(urlInput, {
      target: { value: blogObject.url },
    });

    fireEvent.submit(form);

    expect(mockAddBlog).toHaveBeenCalled();
    expect(mockAddBlog).toHaveBeenCalledWith(blogObject);
  });
});