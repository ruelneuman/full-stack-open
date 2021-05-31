import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  return (
    <p>
      {part.name} {part.exerciseCount}
    </p>
  );
};

export default Part;