import User from '../models/user';

export const getById = (id) => {
  return User.findById(id);
};

export const getByUID = async (uid) => {
  const user = await User.findOne({
    uid,
  });

  if (user) {
    return user.toObject();
  }

  return null;
};

export const getByUsername = async (username) => {
  const user = await User.findOne({
    username,
  });

  if (user) {
    return user.toObject();
  }

  return null;
};

export const getByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });

  if (user) {
    return user.toObject();
  }

  return null;
};

export const getByPhone = async (phone) => {
  const user = await User.findOne({
    phone,
  });

  if (user) {
    return user.toObject();
  }

  return null;
};

export const getAll = () => {
  return User.find();
};

export const create = (m) => {
  return User.create(m);
};
