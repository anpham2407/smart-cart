import moment from "moment";
import { nanoid }  from "nanoid";
import * as UserRepo from '../repo/user';
import {
  ErrUserNotExist,
  ErrInvalidAuthCredentials,
  ErrEmailHasBeenUsed,
  ErrUserAlreadyActivated,
  ErrUsernameHasBeenUsed,
  ErrEmailNotExist,
} from '../core/error';
import {
  generateAccessToken,
  hashAndCompare,
  hashPassword,
} from '../utils/token';
import JobQueue from '../job';

// userLogin tries fuzzy login with id can be username/email/phone
export const userLogin = async ({ id, password }) => {
  let user;

  // try find user with email
  user = await UserRepo.getByEmail(id);

  if (!user) {
    // try find user with phone
    user = await UserRepo.getByPhone(id);
  }

  if (!user) {
    // try with username ??
    user = await UserRepo.getByUsername(id);
  }

  if (!user) {
    throw ErrUserNotExist;
  }

  // validate password
  const matched = await hashAndCompare(password, user.password);
  if (!matched) {
    throw ErrInvalidAuthCredentials;
  }

  // generate access token
  // now we don't use refresh token
  const token = await generateAccessToken({
    id: user._id,
    uid: user.uid,
    email: user.email,
    phone: user.phone,
    username: user.username,
  });

  const authResponse = {
    ...user,
    accessToken: token,
  };
  delete authResponse.password;
  return authResponse;
};

export const userActivateAccount = async ({
  uid,
  username,
  email,
  password,
  firstName,
  lastName,
}) => {
  let user;
  // find user with this uid, email
  user = await UserRepo.getByUID(uid);
  if (!user) {
    throw ErrUserNotExist;
  }

  if (user.activatedAt) {
    throw ErrUserAlreadyActivated;
  }

  // check email existed
  const userByEmail = await UserRepo.getByEmail(email);
  if (userByEmail) {
    throw ErrEmailHasBeenUsed;
  }

  // check username existed
  const userByUsername = await UserRepo.getByUsername(username);
  if (userByUsername) {
    throw ErrUsernameHasBeenUsed;
  }

  // hashpassword
  const hashedPassword = await hashPassword(password);

  // update User profile
  await UserRepo.updateByUID(uid, {
    username,
    email,
    password: hashedPassword,
    activatedAt: new Date(),
    firstName,
    lastName,
  });

  const updatedUser = await UserRepo.getByUID(uid);
  delete updatedUser.password;
  return updatedUser;
};


export const forgotPassword = async ({ email }) => {
  
  const user = await UserRepo.getByEmail(email);
  if (!user) throw ErrEmailNotExist;

  let resetToken = nanoid(48);
  user.resetToken = resetToken;
  user.expiredResetPassword = moment().add(5, 'minutes');
  await Promise.all([
      UserRepo.updateByUID(user.uid, user),
      JobQueue.createForgotPasswordMail(user),
  ]);
  
}