import httpStatusCodes from 'http-status-codes';

// Interfaces
import { IDeleteById, IDetailById } from '../interfaces/common.interface';
import IController from '../interfaces/IController';
import {
  IUpdateUser,
  IUserQueryParams
} from '../interfaces/user.interface';

// Errors

// Services
import userService from '../services/user/user.service';

// Utilities
import ApiResponse from '../utilities/api-response.utility';
import ApiUtility from '../utilities/api.utility';

// Constants
import constants from '../constants';
import { ICreateSangKien } from '../interfaces/sang-kien.interface';
import sangkienService from '../services/sangkien.service';

const create: IController = async (req, res) => {
  try {
    const params: ICreateSangKien = {
      title: req.body.title,
      author: req.body.author,
    }
    const sangKien = await sangkienService.create(params);
    return ApiResponse.result(res, sangKien, httpStatusCodes.CREATED);
  } catch (e) {
    if (e.code === constants.ERROR_CODE.DUPLICATED) {
      return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Email already exists.');
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};


const detail: IController = async (req, res) => {
  try {
    const params: IDetailById = {
      id: parseInt(req.params.id, 10),
    }
    const data = await sangkienService.detail(params);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const update: IController = async (req, res) => {
  try {
    const params: IUpdateUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      id: parseInt(req.params.id, 10),
    }
    await userService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const updateMe: IController = async (req, res) => {
  try {
    const params: IUpdateUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      id: req.user.id,
    }
    await userService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const list: IController = async (req, res) => {
  try {
    const limit = ApiUtility.getQueryParam(req, 'limit');
    const page = ApiUtility.getQueryParam(req, 'page');
    const keyword = ApiUtility.getQueryParam(req, 'keyword');
    const params: IUserQueryParams = { limit, page, keyword };
    const data = await userService.list(params);
    return ApiResponse.result(res, data.response, httpStatusCodes.OK, null, data.pagination);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const remove: IController = async (req, res) => {
  try {
    const params: IDeleteById = {
      id: parseInt(req.params.id, 10),
    }
    await userService.remove(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};


export default {
  create,
  detail,
  update,
  updateMe,
  list,
  remove,
};
