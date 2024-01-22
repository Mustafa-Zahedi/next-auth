export const CREATE_USER_SETTING = `
  mutation CreateUserSetting($userUUID: String!, $key: String!, $value: JSON!) {
    createUserSetting(userUUID: $userUUID, key: $key, value: $value) {
      id
      uuid
      userId
      key
      value
    }
  }
`;
