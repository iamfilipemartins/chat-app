export const isValidEmail = (email?: string): boolean => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return !!email && reg.test(email);
}; 
