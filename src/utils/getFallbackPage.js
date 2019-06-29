//this function returns the path to the fallback page(the page where the user will be redirected) according to user role
const getFallbackPage = role => {
  switch (role) {
    case "admin":
      return "/dashboard";
    case "manufacturer":
      return "/manufacturerDashboard";
    default:
      return "/login";
  }
};

export default getFallbackPage;
