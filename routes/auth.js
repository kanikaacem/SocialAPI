const router = require("express").Router();
const User = require("../models/User");
//bcrypt used for the new password generation
const bcrypt = require("bcrypt");

//Register

router.post("/register", async (req, res) => {
  //const NewUser = await new User({
  //username: "Kanika",
  //email: "Kanika@gmail.com",
  //password: "123456",
  //});
  //await NewUser.save();
  //res.json({ NewUser });

  try {
    //to generate the hash password use , npm save bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).send("User not found");
    // 404 status is used if the user is not found
    //now we compare the password with the help of bcrypt
    const password = await bcrypt.compare(req.body.password, user.password);
    !password && res.status(400).send("Password is incorrect");

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
