const { connect } = require("getstream");
const StreamChat = require("stream-chat").StreamChat;
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const apiKey = process.env.STREAM_KEY;
const apiSecret = process.env.STREAM_SECRET;
const appId = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
  const {
    fullName,
    username,
    password,
    phoneNumber,
    confirmPassword,
    avatarURL,
  } = req.body;

  if (
    !fullName ||
    !username ||
    !phoneNumber ||
    !avatarURL ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).send("Please fill out the entire form");
  }

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const serverClient = connect(apiKey, apiSecret, appId);

    const userId = crypto.randomBytes(16).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createUserToken(userId);

    res
      .status(200)
      .json({ token, fullName, username, userId, hashedPassword, phoneNumber });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username && !password) {
    return res.status(400).send("Please fill out credentials");
  } else if (!username || !password) {
    return res
      .status(400)
      .send(`Please enter ${!username ? "username" : "password"}`);
  }

  try {
    const serverClient = connect(apiKey, apiSecret, appId);
    const client = StreamChat.getInstance(apiKey, apiSecret);

    const { users } = await client.queryUsers({ name: username });
    if (users.length == 0) {
      return res.status(400).send("Username does not exist");
    }

    const success = await bcrypt.compare(password, users[0].hashedPassword);

    if (!success) {
      return res.status(400).send("Incorrect password");
    }

    const token = serverClient.createUserToken(users[0].id);
    res.status(200).json({
      token,
      fullName: users[0].fullName,
      username,
      userId: users[0].id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "error" });
  }
};

module.exports = { signup, login };
