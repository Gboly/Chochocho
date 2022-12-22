const getAuthenticatedUser = async (req, res) => {
  res.status(200).json(req.user);
};

export { getAuthenticatedUser };
