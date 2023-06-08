interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBase, CoursePartDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBase, CoursePartDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartRequirements extends CoursePartBase, CoursePartDescription {
  requirements: string[];
  kind: 'special';
}

export interface CourseName {
  name: string;
}

export interface CoursePartArray {
  courses: CoursePart[];
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;
