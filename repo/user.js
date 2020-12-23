import User from '../models/user';

export const getById = (id) => {
  return User.findById(id);
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

export const getAll = () => {
  return User.find();
};

export const create = (m) => {
  return User.create(m);
};
