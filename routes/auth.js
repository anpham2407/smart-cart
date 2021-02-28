import express from 'express';
import moment from 'moment';
import { APIError } from '../core/error';
import * as AuthService from '../services/auth';
import * as UserService from '../services/user';
import {
  hashPassword,
} from '../utils/token';

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

const ErrInvalidForgotPasswordRequest = APIError({
  status: 400,
  code: 'INVALID_FORGOT_PASSWORD_REQUEST',
  message:
    'invalid forgot password request, missing email or wrong email',
});

const ErrInvalidResetPasswordRequest = APIError({
  status: 400,
  code: 'INVALID_RESET_PASSWORD_REQUEST',
  message:
    'invalid reset password request, missing email or wrong email',
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
    const { uid, username, email, password, firstName, lastName } = req.body;

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
    };

    const activatedUser = await AuthService.userActivateAccount(
      activateAccountReq,
    );
    res.json(activatedUser);
  } catch (error) {
    next(error);
  }
});

router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!(email)) {
      return next(ErrInvalidForgotPasswordRequest);
    }
    console.log(email)
    await AuthService.forgotPassword({ email });
    res.json({success: true});
  } catch (error) {
    next(error);
  }
});

router.post('/reset-password', async (req, res, next) => {
    const  { verifyToken, uid, newPassword } = req.body;
    const user = await UserService.findById(uid);
    if (!user) throw ErrInvalidResetPasswordRequest;
    if (
        user.resetToken == verifyToken && moment().isBefore(user.expiredResetPassword)
    ) {
        user.password = hashPassword(newPassword);
        user.expiredResetPassword = moment();
        await UserService.update(user._id, user);
    }
    else throw ErrInvalidResetPasswordRequest;
    res.json({success: true});
})

module.exports = router;
