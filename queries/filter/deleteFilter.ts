export const DELETE_FILTER = `
  mutation DeleteFilter($uuid: String!) {
    deleteFilter(uuid: $uuid) {
      id
      uuid
      title
      type
      filter
    }
  }
`;
