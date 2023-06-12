/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { customerDTO } from './dto/createCustomer.dto';
import { commentOnSupportRequestDTO, supportRequestDTO } from './dto/createSupportRequest.dto';
import { CustomerAuthGuard } from '../Auth/guards/customer-auth.guard';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post('/create')
  async createCustomer(@Body() params: customerDTO) {
    return this.service.createCustomer(params);
  }

  @UseGuards(AuthGuard('customer'))
  @Post('/support_request/create')
  async createSupportRequest(@Body() params: supportRequestDTO, @Req() req: Request) {
    const authCustomer: any = req.user;

    return this.service.createSupportRequest(params, authCustomer._id);
  }

  @UseGuards(AuthGuard('customer'))
  @Get('/support_requests/all')
  async getAllSupportRequests(@Req() req: Request) {
    const authCustomer: any = req.user;
    return this.service.allSupportRequests(authCustomer._id);
  }

  @UseGuards(AuthGuard('customer'))
  @Post('/support_request/comment')
  async comment(@Body() params: commentOnSupportRequestDTO, @Req() req: Request) {
    const authCustomer: any = req.user;
    return this.service.commentOnSupportRequest(params, authCustomer._id);
  }
}
