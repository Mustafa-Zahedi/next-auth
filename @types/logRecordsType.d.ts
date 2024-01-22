export interface LogRecordsType {
  id: number;
  userUuid: string;
  type: string;
  code: string;
  message: string;
  sourceType: string;
  sourceId: number;
  ip: string;
  port: number;
  agent: string;
  createdAt: string;
  user: {
    imageUrl: string;
    firstName: string;
    lastName: string;
  }
}