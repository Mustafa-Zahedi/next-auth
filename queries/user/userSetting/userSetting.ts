export const USER_SETTING = `
  query UserSetting($userUUID: String!, $key: String!) {
    userSetting(userUUID: $userUUID, key: $key) {
      id
      uuid
      userId
      key
      value
    }
  }
`;
