// routes/api/postRoutes.js
const router = require("express").Router();
const { Post } = require("../../models/Post");

router.post("/", async (req, res) => {
    // Handle creating a new post
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", async (req, res) => {
    // Handle updating a post
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!updatedPost) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    // Handle deleting a post
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
