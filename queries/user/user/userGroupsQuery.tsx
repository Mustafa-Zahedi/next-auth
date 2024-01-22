export const USER_GROUPS = `
  query UserGroups($take: Int!, $skip: Int!, $order: [UserOrderBy!], $filter: UserFilter) {
    userGroups(take: $take, skip: $skip, order: $order, filter: $filter) {
      items {
        id
        uuid
        name,
        slug,
        createdAt,
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
