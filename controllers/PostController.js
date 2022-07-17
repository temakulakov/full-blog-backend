import PostModule from "./../models/Post.js"

export const create = async (req, res) => {
  try {
    const doc = new PostModule({
      title: req.body.title,
      text: req.body.text,
      imageURL: req.body.imageURL,
      tags: req.body.tags,
      user: req.userId,
    })
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Can't add post..."
    })
  }
};
