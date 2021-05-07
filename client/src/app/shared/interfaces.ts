
export interface User {
  name: string;
  email: string;
  avatar?: string;
  id?: string;
  token: string;
}

export interface Calendar {
  user: string;
  title: string;
  days: Day[];
  legends: Legend[];
  description: string;
  year: number;
  legendType: string;
  id?: string;
}

export interface Day {
  day: number;
  month: number;
  calendar: string;
  legend: Legend;
  id?: string;
}

export interface Legend {
  color: string;
  text: string;
  imageSrc: string;
  id?: string;
}

