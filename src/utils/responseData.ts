import { HttpException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';

type ResponseType = {
  error: boolean;
  message: string;
  statusCode: number;
  data?: any;
  token?: string;
};
export const createDataResponse = async (model: Model<any>, dataDto: any, title = 'Item'): Promise<ResponseType> => {
  try {
    const _data = await model.create(dataDto);
    const { ...data } = _data.toObject();
    return {
      error: false,
      message: `${title} creation Success!`,
      statusCode: 201,
      data,
    };
  } catch (error: any) {
    console.log(error.stack);

    throw new HttpException('Something went wrong!', 500);
  }
};

export const loginResponse = async (model: Model<any>, id: mongoose.Types.ObjectId, title = 'User', token: string): Promise<ResponseType> => {
  try {
    // remove password and return login response data
    const { ...data } = await model.findById(id, { password: 0 }, { lean: true });

    return {
      error: false,
      message: `${title} login Success!`,
      statusCode: 200,
      data,
      token,
    };
  } catch (error: any) {
    throw new HttpException('Something went wrong!', 500);
  }
};

export const sendResponse = async (statusCode: number, data: any, message?: string): Promise<ResponseType> => {
  return {
    error: false,
    message: message || 'success!',
    statusCode,
    data,
  };
};
