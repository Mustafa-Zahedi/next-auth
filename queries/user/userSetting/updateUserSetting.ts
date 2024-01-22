export const UPDATE_USER_SETTING = `
  mutation UpdateUserSetting($settingUUID: String!, $value: JSON!) {
    updateUserSetting(settingUUID: $settingUUID, value: $value) {
      id
      uuid
      userId
      key
      value
    }
  }
`;
