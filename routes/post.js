const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
//create a post
router.post("/savePost", async (req, res) => {
  try {
    const newPost = await new Post(req.body);
    const savedPost = await newPost.save();
    !savedPost && res.json("Post is not able to saved");
    res.send(savedPost);
  } catch (err) {
    res.status(500).send(err);
  }
});
//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
      const updatedpost = await Post.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).send("Your post is successfully updated");
    } else {
      res.send("You can't update someone else post");
    }
  } catch (err) {
    res.send(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).remove();
    !post && res.send("Post is already deleted");
    res.status(200).send("Post is deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //If the post doesn't have any value then
    !post && res.json("Post is not present");
    res.status(200).send(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//like and dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId !== req.body.userId) {
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.send("You liked the post");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.send("You disliked the post");
      }
    } else {
      res.send("You can't updated your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get timeline posts
router.post("/timeline", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((freindId) => {
        return Post.find({ userId: freindId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", (req, res) => {
  res.send("This is a post page");
});
module.exports = router;
