export const isValidEmail = (email?: string): boolean => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return !!email && reg.test(email);
};

export const getChatId = (userIdFrom?: any, userIdTo?: any) =>
  `chat-${[userIdFrom, userIdTo].sort().join("-")}`;
