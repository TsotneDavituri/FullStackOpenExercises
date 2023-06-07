interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartBasic extends CoursePartBase {
  description: string
  kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: 'group'
}

interface CoursePartBackground extends CoursePartBase {
  description: string
  backgroundMaterial: string
  kind: 'background'
}

export interface CourseName {
  name: string
}

export interface CoursePartArray {
  courses: CoursePart[]
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
