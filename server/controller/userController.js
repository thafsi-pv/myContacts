export const getAllUser = async (req, res) => {};

export const addOrUpdateUser = async (req, res) => {
  const { data } = req.body;
  let user;
  user = await userModel.create(data);
  res.json(user);
};

export const deleteUserById = async (req, res) => {};
