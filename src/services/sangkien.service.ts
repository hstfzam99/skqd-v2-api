import { getRepository } from 'typeorm';

// Entities
import { SangKien } from '../entities/sang-kien.entity';

// Utilities
import DateTimeUtility from '../utilities/date-time.utility';

// Interfaces
import { IDeleteById, IDetailById } from '../interfaces/common.interface';
import {
  IUserQueryParams
} from '../interfaces/user.interface';

// Errors
import { ICreateSangKien, IUpdateSangKien } from 'sang-kien.interface';
import { StringError } from '../errors/string.error';

const where = { isDeleted: false };

const create = async (params: ICreateSangKien) => {
  const item = new SangKien();
  item.title = params.title;
  item.author = params.author;

  if (params.thumb)
    item.thumb = params.thumb

  if (params.sound)
    item.sound = params.sound

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
