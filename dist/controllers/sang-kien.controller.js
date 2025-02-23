"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// Errors
// Services
const user_service_1 = __importDefault(require("../services/user/user.service"));
// Utilities
const api_response_utility_1 = __importDefault(require("../utilities/api-response.utility"));
const api_utility_1 = __importDefault(require("../utilities/api.utility"));
// Constants
const constants_1 = __importDefault(require("../constants"));
const sangkien_service_1 = __importDefault(require("../services/sangkien.service"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('create controller reached');
    try {
        const params = {
            title: req.body.title,
            author: req.body.author,
        };
        // Handle file uploads
        const thumbFile = req.files && 'thumb' in req.files ? req.files['thumb'][0] : null;
        const soundFile = req.files && 'sound' in req.files ? req.files['sound'][0] : null;
        if (thumbFile)
            params.thumb = `/uploads/${thumbFile.filename}`;
        if (soundFile)
            params.sound = `/uploads/${soundFile.filename}`;
        // 
        console.log(thumbFile, thumbFile.filename, soundFile, soundFile.fieldname);
        console.log(params);
        const sangKien = yield sangkien_service_1.default.create(params);
        return api_response_utility_1.default.result(res, sangKien, http_status_codes_1.default.CREATED);
    }
    catch (e) {
        if (e.code === constants_1.default.ERROR_CODE.DUPLICATED) {
            return api_response_utility_1.default.error(res, http_status_codes_1.default.CONFLICT, 'Email already exists.');
        }
        return api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST);
    }
});
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            id: parseInt(req.params.id, 10),
        };
        const data = yield sangkien_service_1.default.detail(params);
        return api_response_utility_1.default.result(res, data, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            id: parseInt(req.params.id, 10),
        };
        yield user_service_1.default.update(params);
        return api_response_utility_1.default.result(res, params, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const updateMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            id: req.user.id,
        };
        yield user_service_1.default.update(params);
        return api_response_utility_1.default.result(res, params, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = api_utility_1.default.getQueryParam(req, 'limit');
        const page = api_utility_1.default.getQueryParam(req, 'page');
        const keyword = api_utility_1.default.getQueryParam(req, 'keyword');
        const params = { limit, page, keyword };
        const data = yield user_service_1.default.list(params);
        return api_response_utility_1.default.result(res, data.response, http_status_codes_1.default.OK, null, data.pagination);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            id: parseInt(req.params.id, 10),
        };
        yield user_service_1.default.remove(params);
        return api_response_utility_1.default.result(res, params, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
exports.default = {
    create,
    detail,
    update,
    updateMe,
    list,
    remove,
};
