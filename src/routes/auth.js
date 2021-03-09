import express from 'express';
import { APIError } from '../core/error';
import * as AuthService from '../services/auth';

const router = express.Router();

// auth errors
const ErrInvalidAuthRequest = APIError({
  status: 400,
  code: 'INVALID_AUTH_REQUEST',
  message: 'invalid auth request, missing email/phone/password',
});

const ErrActivateAccountRequest = APIError({
  status: 400,
  code: 'INVALID_ACTIVATE_ACCOUNT_REQUEST',
  message:
    'invalid activate account request, missing uid/username/email/password',
});

router.post('/login', async (req, res, next) => {
  try {
    // validate login request payload
    const { id, password } = req.body;
    if (!(id && password)) {
      return next(ErrInvalidAuthRequest);
    }

    const authReq = {
      id,
      password,
    };

    const authResp = await AuthService.userLogin(authReq);

    return res.json(authResp);
  } catch (error) {
    return next(error);
  }
});

router.post('/refresh');

// /* POST new user */
router.post('/activate', async (req, res, next) => {
  try {
    const {
      uid,
      username,
      email,
      password,
      firstName,
      lastName,
      fullName,
    } = req.body;

    if (!(uid && username && email && password)) {
      return next(ErrActivateAccountRequest);
    }

    const activateAccountReq = {
      uid,
      username,
      email,
      password,
      firstName,
      lastName,
      fullName,
    };

    const resp = await AuthService.userActivateAccount(activateAccountReq);
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
