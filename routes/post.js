const router = require("express").Router();
const Post = require("../models/Post");
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
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    (await Post.findById(req.params.id))
      ? Post.findById(req.params.id).remove()
      : res.send("Post is already deleted");
    res.status(200).json("Post is deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //!post to check the post present or not,
    !post && res.send("post not available");
    res.status(200).send(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get timeline posts

router.get("/", (req, res) => {
  res.send("This is a post page");
});
module.exports = router;
