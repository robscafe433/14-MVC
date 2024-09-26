// controllers/postController.js
const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
    const posts = await Post.findAll();
    res.render("homepage", { posts });
};

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    await Post.create({ title, content, userId: req.session.userId });
    res.redirect("/dashboard");
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    await Post.update({ title, content }, { where: { id } });
    res.redirect("/dashboard");
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    await Post.destroy({ where: { id } });
    res.redirect("/dashboard");
};
