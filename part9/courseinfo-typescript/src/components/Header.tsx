import React from 'react';

interface HeaderProps {
  courseName: string;
}

const Header = ({ courseName }: HeaderProps) => {
  return <h1>{courseName}</h1>;
};

export default Header;