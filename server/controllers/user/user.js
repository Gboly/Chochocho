import User from "../../models/user.js";

const getAuthenticatedUser = async (req, res) => {
  res.status(200).json(req.user);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, { password: 0 });
    user
      ? res.status(200).json(user)
      : res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const getUsersById = async (req, res) => {
  try {
    const users = await fetchUsers(req.query);
    users.length > 0
      ? res.status(200).json(users)
      : res.status(404).json({ error: "No user found" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

// Other functions
const fetchUsers = async (query) => {
  const { id, id_ne, _start, _end } = query;
  const users = await User.find(
    {
      _id:
        id_ne && id_ne.length > 0 ? { $ne: id_ne } : id && id.length > 0 && id,
    },
    { password: 0 }
  )
    .skip(_start)
    .limit(_end);

  return users;
};

export { getAuthenticatedUser, getUser, getUsersById };
