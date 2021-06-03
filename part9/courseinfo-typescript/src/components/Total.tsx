import React from 'react';
import { CoursePart } from '../types';

interface TotalProps {
  courseParts: CoursePart[];
}

const Total = ({ courseParts }: TotalProps) => {
  return (
    <p>
      <strong>
        Number of exercises{' '}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </strong>
    </p>
  )
};

export default Total;