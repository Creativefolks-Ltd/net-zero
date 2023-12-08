export const extractToken = () => {
    try {
      return localStorage.getItem(APP_TOKEN);
    } catch (error) {
      console.error(error);
      return "";
    }
  };