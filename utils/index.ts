export const isValidEmail = (email?: string): boolean => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return !!email && reg.test(email);
};

export const getChatId = (userIdFrom?: any, userIdTo?: any) =>
  `chat-${[userIdFrom, userIdTo].sort().join("-")}`;

export const isDoubleTap = (lastTapTimeRef: any) =>{
  const now = new Date().getTime();
  const DOUBLE_TAP_DELAY = 500;

  return now - lastTapTimeRef?.current < DOUBLE_TAP_DELAY;
};
