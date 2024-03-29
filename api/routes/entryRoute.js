const express = require("express");
const { authenticateViaEmail, verifyJWT } = require("../controllers/authController");
const router = express.Router();
const {signUp, login, logOut} = require("../controllers/entryController");
const {me} = require("../controllers/userController");

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/logout", logOut);
router.post("/verify/:id", authenticateViaEmail);
router.get("/me", verifyJWT, me);

// for test jwt verification
router.get("/protect", verifyJWT, (req, res) => res.send({"protect": "true", "love": "true"}));

module.exports = router;
