export const FILTERS = `
  query Filters($type: String!) {
    filters(type: $type) {
      id
      uuid
      type
      title
      filter
    }
  }
`;
