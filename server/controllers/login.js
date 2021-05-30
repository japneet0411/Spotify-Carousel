const empty = require("is-empty");
const axios = require("axios");

export const login = async (req, res, next) => {
  if (empty(req.body.username) || empty(req.body.password)) {
    res.status(200).send({
      message: "Please fill in all the fields",
    });
  }
  await axios
    .post("http://localhost:5000/auth", {
      username: req.body.username,
      password: req.body.password,
    })
    .then((response) => {
      if (response.data.username)
        res.status(200).send({
          message: response.data.message,
          username: response.data.username,
        });
      else
        res.status(200).send({
          message: response.data.message,
        });
    });
};

export const auth = async (req, res, next) => {
  try {
    var data = req.session;
    data.username = req.user.username;
    res.status(200).send({
      message: "Success",
      username: req.user.username,
    });
  } catch (e) {
    console.log(e);
  }
};

export const unauthorized = async (req, res) => {
  res.status(200).send({
    message: "Unauthorized User",
  });
};
