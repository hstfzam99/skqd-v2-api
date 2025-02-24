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
exports.AddFilesToSangKien1740235104031 = void 0;
const typeorm_1 = require("typeorm");
class AddFilesToSangKien1740235104031 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.addColumns('sang_kien', [
                new typeorm_1.TableColumn({
                    name: 'thumb',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                }),
                new typeorm_1.TableColumn({
                    name: 'sound',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                }),
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('sang_kien', 'thumb');
            yield queryRunner.dropColumn('sang_kien', 'sound');
        });
    }
}
exports.AddFilesToSangKien1740235104031 = AddFilesToSangKien1740235104031;
