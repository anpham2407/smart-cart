import User from "../models/user";

export const getById = async (id) => {
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

export const getAll = async () => {
  return User.find();
};

export const create = async (m) => {
  return User.create(m);
};

export const updateByUID = async (uid, updates) => {
  console.log(updates);
  return User.findOneAndUpdate(
    {
      uid,
    },
    {
      $set: {
        ...updates,
      },
    },
    { new: true }
  );
};

export const updateById = (id, updates) => {
  return User.findByIdAndUpdate(
    id,
    {
      $set: {
        ...updates,
      },
    },
    {
      new: true,
    }
  );
};
