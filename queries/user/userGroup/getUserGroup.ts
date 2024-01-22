export const GET_USER_GROUPS = `
  query UserGroups($take: Int!, $filter: UserFilter, $skip: Int, $order: [UserGroupOrderBy!]) {
    userGroups(take: $take, filter: $filter, skip: $skip, order: $order) {
      items {
        createdAt
        id
        name
        slug
        updatedAt
        uuid
      }
      pagination {
        skip
        totalItems
        totalPages
      }
    }
  }
`;
