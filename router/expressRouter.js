import express from "express";
const router = express.Router();

router.route("/readUser").get();

router.route("/createUser").post();

export default router;
