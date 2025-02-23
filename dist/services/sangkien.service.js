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
const typeorm_1 = require("typeorm");
// Entities
const sang_kien_entity_1 = require("../entities/sang-kien.entity");
// Utilities
const date_time_utility_1 = __importDefault(require("../utilities/date-time.utility"));
const string_error_1 = require("../errors/string.error");
const where = { isDeleted: false };
const create = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const item = new sang_kien_entity_1.SangKien();
    item.title = params.title;
    item.author = params.author;
    if (params.thumb)
        item.thumb = params.thumb;
    if (params.sound)
        item.sound = params.sound;
    const newRecord = yield typeorm_1.getRepository(sang_kien_entity_1.SangKien).save(item);
    return newRecord;
});
const getById = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield typeorm_1.getRepository(sang_kien_entity_1.SangKien).findOne({ id: params.id });
        return data;
    }
    catch (e) {
        return null;
    }
});
const detail = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        where: Object.assign(Object.assign({}, where), { id: params.id }),
    };
    const sangKien = yield typeorm_1.getRepository(sang_kien_entity_1.SangKien).findOne(query);
    if (!sangKien) {
        throw new string_error_1.StringError('Không tìm thấy sáng kiến');
    }
    return sangKien;
});
const update = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const query = Object.assign(Object.assign({}, where), { id: params.id });
    const sangKien = yield typeorm_1.getRepository(sang_kien_entity_1.SangKien).findOne(query);
    if (!sangKien) {
        throw new string_error_1.StringError('Không tìm thấy sáng kiến');
    }
    return yield typeorm_1.getRepository(sang_kien_entity_1.SangKien).update(query, {
        title: params.title,
        author: params.author,
        updatedAt: date_time_utility_1.default.getCurrentTimeStamp(),
    });
});
const list = (params) => __awaiter(void 0, void 0, void 0, function* () {
    let sangKienRepo = typeorm_1.getRepository(sang_kien_entity_1.SangKien).createQueryBuilder('sang_kien');
    sangKienRepo = sangKienRepo.where('user.isDeleted = :isDeleted', { isDeleted: false });
    if (params.keyword) {
        sangKienRepo = sangKienRepo.andWhere('(LOWER(sang_kien.title) LIKE LOWER(:keyword) OR LOWER(sang_kien.title) LIKE LOWER(:keyword))', { keyword: `%${params.keyword}%` });
    }
    // Pagination
    const sangKiens = yield sangKienRepo.getMany();
    return { sangKiens };
});
const remove = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const query = Object.assign(Object.assign({}, where), { id: params.id });
    const sangKien = yield typeorm_1.getRepository(sang_kien_entity_1.SangKien).findOne(query);
    if (!sangKien) {
        throw new string_error_1.StringError('Không tìm thấy sáng kiến');
    }
    return yield typeorm_1.getRepository(sang_kien_entity_1.SangKien).update(query, {
        isDeleted: true,
        updatedAt: date_time_utility_1.default.getCurrentTimeStamp(),
    });
});
exports.default = {
    create,
    getById,
    detail,
    update,
    list,
    remove,
};
