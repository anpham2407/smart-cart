const INTERNAL_SERVER_ERROR = 'INTERNAL';

export const APIError = ({ code, status, message, details }) => {
  return {
    status: status || 500,
    code: code || INTERNAL_SERVER_ERROR,
    message: message,
    details: details,
  };
};

// service errors
export const ErrUserNotActivated = APIError({
  code: 'USER_NOT_ACTIVATED',
  status: 401,
  message: 'user/profile has not been activated',
});

export const ErrUserNotExist = APIError({
  code: 'USER_NOT_FOUND',
  status: 404,
  message: 'user/profile uid not found in this system',
});

export const ErrInvalidAuthCredentials = APIError({
  code: 'INVALID_AUTH_CREDENTIALS',
  status: 401,
  message: 'invalid auth credentials',
});
