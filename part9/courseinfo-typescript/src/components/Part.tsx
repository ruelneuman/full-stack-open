import React from 'react';
import { assertNever } from '../utils';
import {
  CoursePart,
  CourseNormalPart,
  CourseProjectPart,
  CourseSubmissionPart,
  CourseSpecialPart,
} from '../types';

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  const normalPart = (part: CourseNormalPart) => {
    return (
      <p>
        <div><strong>{part.name}</strong></div>
        <div><em>{part.description}</em></div>
        <div>Exercises: {part.exerciseCount}</div>
      </p>
    )
  };

  const projectPart = (part: CourseProjectPart) => {
    return (
      <p>
        <div><strong>{part.name}</strong></div>
        <div>Exercises: {part.exerciseCount}</div>
        <div>Project Exercises: {part.groupProjectCount}</div>
      </p>
    )
  };

  const submissionPart = (part: CourseSubmissionPart) => {
    return (
      <p>
        <div><strong>{part.name}</strong></div>
        <div><em>{part.description}</em></div>
        <div>Exercises: {part.exerciseCount}</div>
        <div>Submission: <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a></div>
      </p>
    )
  };

  const specialPart = (part: CourseSpecialPart) => {
    return (
      <p>
        <div><strong>{part.name}</strong></div>
        <div><em>{part.description}</em></div>
        <div>Exercises: {part.exerciseCount}</div>
        <div>Requirements: </div>
        <ul>
          {part.requirements.map((requirement) => {
            return (
              <li key={requirement}>{requirement}</li>
            );
          })}
        </ul>
      </p>
    )
  };

  switch (part.type) {
    case 'normal':
      return normalPart(part);
    case 'groupProject':
      return projectPart(part);
    case 'submission':
      return submissionPart(part);
    case 'special':
      return specialPart(part);
    default:
      return assertNever(part);
  }
};

export default Part;