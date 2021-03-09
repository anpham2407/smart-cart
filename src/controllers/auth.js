import jwt from 'jsonwebtoken';
import { APIError } from '../core/error';

const ErrMissingAuthorizationHeader = APIError({
  status: 401,
  code: 'MISSING_AUTHORIZATION_HEADER',
  message: 'missing authorization header',
});

const ErrInvalidBearerToken = APIError({
  status: 401,
  code: 'INVALID_BEARER_TOKEN',
  message: 'invalid Bearer token format',
});

export const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(ErrMissingAuthorizationHeader);
  }

  let token = '';
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7, authHeader.length);
  } else {
    throw ErrInvalidBearerToken;
  }

  next();
};
