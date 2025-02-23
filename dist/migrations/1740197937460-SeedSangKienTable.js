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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedSangKienTable1740197937460 = void 0;
const sang_kien_entity_1 = require("../entities/sang-kien.entity");
const admin_seed_1 = require("../seeds/admin.seed");
const typeorm_1 = require("typeorm");
class SeedSangKienTable1740197937460 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.getRepository(sang_kien_entity_1.SangKien).save(admin_seed_1.sangKienSeed);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.SeedSangKienTable1740197937460 = SeedSangKienTable1740197937460;
