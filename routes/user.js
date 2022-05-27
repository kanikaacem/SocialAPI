const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
//update a user (like password)
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const user = await User.findByIdAndUpdate(req.body.userId, {
        $set: req.body,
      });
      res.status(200).json("User is updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send("You can update only your password");
  }
});
//delete a user
router.delete("/:id", async (req, res) => {
  try {
    await User.findById(req.params.id).remove();
    res.status(200).json("User is deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    //user._doc get all the data
    const { password, updatedAt, ...other } = user._doc;

    !user && res.json("user doesn't found");
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});
//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("You are started to following this user");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});
//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("You start unfollowing this user");
      } else {
        res.status(403).json("You don't unfollow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
});

router.get("/", (req, res) => {
  res.send("This is auth route");
});
module.exports = router;
