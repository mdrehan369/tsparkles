export const STATUS_CODES = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_AUTHENTICATED: 401,
  NO_CONTENT: 204,
};

export const EMAIL_SUBJECTS = {
  SEND_OTP: "Verify your account with this OTP",
  SEND_ORDER_CONFIRMATION: "Order Confirmed!",
};

export const OTP_EXPIRY_TIME = 5 * 60 * 1000; // ms
