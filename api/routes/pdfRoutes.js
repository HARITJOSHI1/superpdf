const express = require("express");
const Router = express.Router();
const {scheduleDelete} = require("../utils/deleteUnusedFiles");
const {
  uploadFiles,
  compress,
  wordToPDF,
  encrypt,
  merge,
  rotate,
  deletePages
} = require("../controllers/fileController");

const { addUsage } = require('../controllers/usageController');
Router.use(uploadFiles);

Router.post("/compress", compress);
Router.post("/encrypt", encrypt);
Router.post("/merge", merge);
Router.post("/word-to-pdf", uploadFiles, wordToPDF);
Router.post("/rotate", rotate);
Router.post("/deletePages", deletePages);

// Router.use(addUsage);
Router.use(scheduleDelete);

module.exports = Router;
