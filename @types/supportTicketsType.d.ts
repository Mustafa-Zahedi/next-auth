export interface SupportTicketsType {
  id: number;
  uuid: string;
  userId: number;
  categoryId: number;
  responsibleGroupId: number;
  responsibleUserId: number;
  userUuid: string;
  supportGroupUuid: string;
  responsibleUserUuid: string;
  title: string;
  url: string;
  site: { siteName: string };
  content: string;
  urgency: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}
