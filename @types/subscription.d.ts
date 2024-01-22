import { number } from "yup";

export interface SubscriptionType {
  id: number;
  name: string;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  features: {
    id: number;
    feature: string;
  };
  endUsers: {
    id: number;
    uuid: string;
    email: string;
  };
}
