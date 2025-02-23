"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Controller
const sang_kien_controller_1 = __importDefault(require("../../controllers/sang-kien.controller"));
const multer_middleware_1 = require("../../middlewares/multer.middleware");
const router = express_1.default.Router();
router.get('/', sang_kien_controller_1.default.list);
router.get('/:id', sang_kien_controller_1.default.detail);
router.post('/', multer_middleware_1.upload.fields([{ name: 'thumb' }, { name: 'sound' }]), sang_kien_controller_1.default.create);
exports.default = router;
