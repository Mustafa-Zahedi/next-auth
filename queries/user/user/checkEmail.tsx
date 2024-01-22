export const CHECK_EMAIL = `
  query CheckEmail($email: String!, $exclude: [String!]) {
    checkEmail(email: $email, exclude: $exclude)
  }
`;
