export const CHECK_NICK_NAME = `
  query CheckNickName($nickName: String!, $exclude: [String!]) {
    checkNickName(nickName: $nickName, exclude: $exclude)
  }
`;
