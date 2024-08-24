export const isTokenExpired = () => {
    const expiryTime = localStorage.getItem('accessTokenExpiry');
    if (!expiryTime) return true;
    return new Date().getTime() > expiryTime;
  };
  
  export const removeExpiredTokens = () => {
    if (isTokenExpired()) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessTokenExpiry');
    }
  };  