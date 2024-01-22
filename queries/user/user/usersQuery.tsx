export const USERS = `
  query Users($take: Int!, $skip: Int!, $order: [UserOrderBy!], $filter: UserFilter) {
    users(take: $take, skip: $skip, order: $order, filter: $filter) {
      items {
        id
        uuid
        firstName
        lastName
        email
        imageUrl
        createdAt
        updatedAt
      }
      pagination {
        totalItems
        totalPages
        skip
      }
    }
  }
`;
