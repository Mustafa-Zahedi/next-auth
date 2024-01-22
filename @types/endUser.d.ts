import { number } from "yup";

export interface EndUserType {
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  password: string;
  avatar: string;
  location: string;
  lastLogin: string;
  email: string;
  bio: string;
  createdAt: string;
  ipAddress: string;

  provider: string;
  providerAccountId: string;

  interests: {
    id: number;
    name: string;
  };

  categories: {
    name: string;
    id: number;
  };

  subscriptionType: {
    id: number;
    name: string;
    price: number;
    features: {
      id: number;
      feature: string;
    };
  };
}
