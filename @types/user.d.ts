export interface User {
  id: number;
  uuid: string;
  title: string;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  password: string;
  about: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deleteddAt: Date;
  groups?: { name: string }[];
}
