const INTERNAL_SERVER_ERROR = 'INTERNAL';

export const APIError = ({ code, status, message, details }) => {
  return {
    status: status || 500,
    code: code || INTERNAL_SERVER_ERROR,
    message: message,
    details: details,
  };
};
