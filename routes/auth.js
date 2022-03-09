const express = require("express");
const passport = require("passport");
const Doctor = require("../models/Doctor");
const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/");
    }
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.get("/get-doctor/:id", async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                data: doctor,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            error: err,
        });
    }
});

module.exports = router;
