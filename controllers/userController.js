// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.redirect("/login");
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
        req.session.userId = user.id;
        res.redirect("/dashboard");
    } else {
        res.redirect("/login");
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
};
