export const CREATE_FILTER = `
  mutation CreateFilter($type: String!, $title: String!, $filter: JSON!) {
    createFilter(type: $type, title: $title, filter: $filter) {
      id
      uuid
      title
      filter
    }
  }
`;
