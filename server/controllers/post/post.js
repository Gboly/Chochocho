import Post from "../../models/post.js";

const addNewPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const getPosts = async (req, res) => {
  const { id, _start, _end } = req.query;
  try {
    const posts = await Post.find({ ...req.query, _id: id })
      .skip(_start)
      .limit(_end);

    posts.length > 0
      ? res.status(200).json(posts)
      : res.status(404).json({ error: "No post found" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    post
      ? res.status(200).json(post)
      : res.status(404).json({ error: "post is not found" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

export { addNewPost, getPosts, getPostById };
