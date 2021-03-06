const path = require("path");
const multer = require("multer");
const CompressPDF = require("../utils/classes/CompressPDF");
const MergePDF = require("../utils/classes/MergePDF");
const { WordToPDF } = require("../utils/classes/Conversion");
const RotatePDF = require("../utils/classes/Rotation");
const catchAsync = require("../utils/catchAsync");
const Encryption = require("../utils/classes/Security");
const AppError = require("../utils/classes/AppError");
const Cookies = require("../utils/classes/Cookies");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext.matchAll(/^.*\.(|doc|docx|pdf|ppt|pptx)$/g)) {
    cb(null, file);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadFiles = upload.array("files", 10);

const addDocInfoCookie = (res, doc) =>
  new Cookies().sendCookie(res, "docData", [{ name: doc }]);

exports.compress = catchAsync(async (req, res, next) => {
  console.log("File compressing ......");
  const comp = await CompressPDF.compress(req.files);

  if (!comp)
    throw new AppError(
      500,
      "Failed to compress",
      ` fn upload(),  ${__dirname}`
    );

  req.filename = comp.fileName;
  req.msg = "PDF compressed";

  addDocInfoCookie(res, comp.fileName);
  next();
});

exports.merge = catchAsync(async (req, res, next) => {
  console.log("File merging ......");
  const comp = await MergePDF.merge(req.files);

  if (!comp)
    throw new AppError(500, "Failed to merge", ` fn upload(),  ${__dirname}`);

  req.filename = comp.fileName;
  req.msg = "PDF merged";

  addDocInfoCookie(res, comp.fileName);
  next();
});

exports.wordToPDF = async (req, res, next) => {
  console.log("File converting ......");
  const comp = await WordToPDF.convert(req.files);

  if (!comp)
    throw new AppError(500, "Failed to convert", ` fn upload(),  ${__dirname}`);

  req.filename = comp.fileName;
  req.msg = "PDF converted";

  addDocInfoCookie(res, comp.fileName);
  next();
};

exports.rotate = catchAsync(async (req, res, next) => {
  console.log("File rotating ......");

  const { type } = req.query;
  const comp = await RotatePDF.rotate(req.files, type);

  if (!comp)
    throw new AppError(500, "Failed to rotate", ` fn upload(),  ${__dirname}`);
    
  req.filename = comp.fileName;
  req.msg = "PDF rotated";

  addDocInfoCookie(res, comp.fileName);
  next();
});

exports.encrypt = catchAsync(async (req, res, next) => {
  console.log("File encrypting ......");

  const rules = {
    e_extract_content: false,
  };

  await Encryption.initialize();
  const comp = new Encryption(req.files[0], rules, "owner");
  await comp.encryptViaPass(req.body.password);

  req.filename = comp.fileName;
  req.msg = "PDF encypted";
  addDocInfoCookie(res, comp.fileName);

  next();
});
