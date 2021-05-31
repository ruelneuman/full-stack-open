import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((coursePart) => {
        return (
          <Part key={coursePart.name} part={coursePart} />
        )
      })}
    </div>
  );
};

export default Content;