import { getRepository } from 'typeorm';

// Entities
import { User } from '../entities/user/user.entity';

// Utilities
import Encryption from '../utilities/encryption.utility';
import ApiUtility from '../utilities/api.utility';
import DateTimeUtility from '../utilities/date-time.utility';

// Interfaces
import {
  ICreateUser,
  ILoginUser,
  IUpdateUser,
  IUserQueryParams,
} from '../interfaces/user.interface';
import { IDeleteById, IDetailById } from '../interfaces/common.interface';

// Errors
import { StringError } from '../errors/string.error';
import { SangKien } from '../entities/user/sang-kien.entity';
import { ICreateSangKien, IUpdateSangKien } from 'sang-kien.interface';

const where = { isDeleted: false };

const create = async (params: ICreateSangKien) => {
  const item = new SangKien();
  item.title = params.title;
  item.author = params.author;
  const newRecord = await getRepository(SangKien).save(item);
  return newRecord;
};


const getById = async (params: IDetailById) => {
  try {
    const data = await getRepository(SangKien).findOne({ id: params.id });
    return data;
  } catch (e) {
    return null;
  }
};

const detail = async (params: IDetailById) => {
  const query = {
    where: { ...where, id: params.id },
  }

  const sangKien = await getRepository(SangKien).findOne(query);
  if (!sangKien) {
    throw new StringError('Không tìm thấy sáng kiến');
  }

  return sangKien;
}

const update = async (params: IUpdateSangKien) => {
  const query = { ...where, id: params.id };

  const sangKien = await getRepository(SangKien).findOne(query);
  if (!sangKien) {
    throw new StringError('Không tìm thấy sáng kiến');
  }

  return await getRepository(SangKien).update(query, {
    title: params.title,
    author: params.author,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
}

const list = async (params: IUserQueryParams) => {
  let sangKienRepo = getRepository(SangKien).createQueryBuilder('sang_kien');
  sangKienRepo = sangKienRepo.where('user.isDeleted = :isDeleted', { isDeleted: false });

  if (params.keyword) {
    sangKienRepo = sangKienRepo.andWhere(
      '(LOWER(sang_kien.title) LIKE LOWER(:keyword) OR LOWER(sang_kien.title) LIKE LOWER(:keyword))',
      { keyword: `%${params.keyword}%` },
    );
  }

  // Pagination
  const sangKiens = await sangKienRepo.getMany();

 
  return { sangKiens };
};

const remove = async (params: IDeleteById) => {
  const query = { ...where, id: params.id };

  const sangKien = await getRepository(SangKien).findOne(query);
  if (!sangKien) {
    throw new StringError('Không tìm thấy sáng kiến');
  }

  return await getRepository(SangKien).update(query, {
    isDeleted: true,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
}

export default {
  create,
  getById,
  detail,
  update,
  list,
  remove,
}
