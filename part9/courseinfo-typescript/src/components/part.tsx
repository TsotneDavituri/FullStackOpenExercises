import { CoursePart } from '../types';

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  const cursive = {
    fontStyle: 'italic',
  };

  switch (coursePart.kind) {
    case 'basic':
      return (
        <>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <div style={cursive}>{coursePart.description}</div>
        </>
      );
    case 'group':
      return (
        <>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <div>project exercises: {coursePart.groupProjectCount}</div>
        </>
      );
    case 'background':
      return (
        <>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <div style={cursive}>{coursePart.description}</div>
          <div>{coursePart.backgroundMaterial}</div>
        </>
      );

    case 'special':
      return (
        <>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <div style={cursive}>{coursePart.description}</div>
          <div>required skills: {coursePart.requirements.join(', ')}</div>
        </>
      );
    default:
      return null;
  }
};

export default Part;
