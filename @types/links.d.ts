export interface LinksTypes {
  id: number;
  uuid: string;
  title: string;
  url: string;
  fullUrl: string;
  description: string;
  description: String;
  iconName: String;
  target: string;
  rel: string;
  param1: string;
  param2: string;
  param1PageId: number;
  param2PageId: number;
  slug: boolean;
  popupWidth: number;
  popupHeight: number;
  menuType: string;
  privacy: string;
  status: "Active" | "Passive";
  // createdAt: string;
  // updatedAt: string;

  attachment: [
    {
      linkId: number;
      attachmentId: number;
      // attachment: Attachment;
    }
  ];

  pageId: string;

  // parent   Link?  @relation("link_tree", fields: [parentId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  parentId: number;

  children: LinksTypes[];
}

// id Int @id @default(autoincrement())
// uuid String   @unique @default(uuid())

// title String
// url String
// description String
// iconName String
// target String
// rel String
// popupWidth Float
// popupHeight Float
// menuType String
// privacy String
// status Status @default(Active)

// attachment   LinksOnAttachment[]

// pageUuid String
// page Page @relation(fields: [pageUuid], references: [uuid], onDelete: Cascade, onUpdate: Cascade)

// parent   Link?  @relation("link_tree", fields: [parentId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// parentId Int?

// children Link[] @relation("link_tree")
