import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
};

export const hashAndCompare = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

export const generateAccessToken = async ({
  id,
  uid,
  email,
  phone,
  username,
}) => {
  const payload = {
    id,
    uid,
    email,
    phone,
    username,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};
