const backendDomain = "http://localhost:8000";

const summaryApi = {
  SignUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
};

export default summaryApi;
