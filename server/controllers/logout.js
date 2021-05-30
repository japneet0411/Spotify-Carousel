export const logout = async (req, res) => {
  res.status(200).send({
    message: "Logged Out Successfully",
  });
};
