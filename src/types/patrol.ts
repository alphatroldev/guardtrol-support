export interface IPatrol {
  _id: string;
  user: string;
  name: string;
  time: string;
  description: string;
  frequency: string;
  points: string[];
  beat: string;
  guards: string[];
  timetocompletepatrol: string;
  createdAt: string;
  updatedAt: string;
}
