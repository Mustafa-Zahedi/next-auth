export interface PageType {
  id: number;
  uuid: string;
  name: string;
  description: string;
  isGeneric: boolean;
  settings?: string;
  templateId?: number;
}
