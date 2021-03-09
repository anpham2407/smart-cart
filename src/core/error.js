const INTERNAL_SERVER_ERROR = 'INTERNAL';

export const APIError = ({ code, status, message, details, fields }) => {
  return {
    status: status || 500,
    code: code || INTERNAL_SERVER_ERROR,
    message: message,
    details: details,
    fields: fields || [],
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

export const ErrEmailHasBeenUsed = APIError({
  code: 'EMAIL_HAS_BEEN_USED',
  status: 409,
  message: 'this email has been used with another account',
});

export const ErrUsernameHasBeenUsed = APIError({
  code: 'USERNAME_HAS_BEEN_USED',
  status: 409,
  message: 'this username has been used with another account',
});

export const ErrUserAlreadyActivated = APIError({
  code: 'USER_ALREADY_ACTIVATED',
  status: 409,
  message: 'this user account has already activated',
});
