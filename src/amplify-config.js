const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: "ap-southeast-1_BK5OhBjL9",
      userPoolClientId: "2t2t701pgloo3dde4p4pmadgkg",
      loginWith: {
        email: true,
      },
    },
  },
};

export default amplifyConfig;