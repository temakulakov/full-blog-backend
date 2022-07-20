import PostModule from "./../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModule({
      title: req.body.title,
      text: req.body.text,
      imageURL: req.body.imageURL,
      tags: req.body.tags,
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Can't add post...",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModule.find().populate("user").exec();

    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Can't get posts",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModule.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Post not found",
          });
        }
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Can't return post",
          });
        }
        res.status(200).json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Can't return post",
    });
  }
};

export const removeOne = async (req, res) => {
  try {
    const postId = req.params.id;
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Can't return post",
    });
  }
};
