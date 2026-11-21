const express = require("express");
const passport = require("passport");
const { signup } = require("../controllers/authController");

const router = express.Router();

router.post("/signup",signup);

router.post(
    "/login",
    passport.authenticate("local"),
    (req, res) => {
        res.status(200).json({
            message: "Login successful",
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            }
        });
    }
);

router.post("/logout", (req, res, next) => {

    req.logout((error) => {

        if (error) {
            return next(error);
        }

        req.session.destroy((error) => {

            if (error) {
                return next(error);
            }

            res.clearCookie("connect.sid");

            return res.status(200).json({
                message: "Logout successful"
            });
        });
    });
});

router.get("/profile", (req, res) => {

    if (!req.isAuthenticated()) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    res.status(200).json({
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    });
});

module.exports = router;