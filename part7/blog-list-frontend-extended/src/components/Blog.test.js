import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;

  const blog = {
    title: 'Example Blog',
    author: 'John Doe',
    url: 'http://www.example.com/blog',
    likes: 42,
    user: {
      username: 'JaneDoe123',
      name: 'Jane Doe',
      id: '60565b29f84680167c021944'
    },
    id: '6057bb88fd97862f10de1fee'
  };

  const user = {
    username: 'JaneDoe123',
    name: 'Jane Doe',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkphbmVEb2UxMjMiLCJuYW1lIjoiSmFuZSBEb2UiLCJleHBpcmVzSW4iOiIxaCJ9.o_I9u6HdKXvXG57Kd7UusR6HcK0DOJPzVxP6in-sNV0'
  };

  const mockUpdateBlog = jest.fn();

  const mockRemoveBlog = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        removeBlog={mockRemoveBlog}
        user={user}
      />
    );
  });

  test('renders the title and author by default, but does not render the url or likes by default', () => {
    expect(component.container).toHaveTextContent(blog.title);

    expect(component.container).toHaveTextContent(blog.author);

    expect(component.container).not.toHaveTextContent(blog.url);

    expect(component.container).not.toHaveTextContent(blog.likes);
  });

  test('renders the url and likes after the \'Show Details\' button is clicked', () => {
    const showDetailsButton = component.getByRole('button', {
      name: /show details/i
    });
    fireEvent.click(showDetailsButton);

    expect(component.container).toHaveTextContent(blog.url);

    expect(component.container).toHaveTextContent(blog.likes);
  });

  test('like button when clicked twice calls the corresponding event handler twice', () => {
    const showDetailsButton = component.getByRole('button', {
      name: /show details/i
    });
    fireEvent.click(showDetailsButton);

    const likeButton = component.getByRole('button', {
      name: /like/i
    });
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockUpdateBlog).toHaveBeenCalledTimes(2);
  });
});