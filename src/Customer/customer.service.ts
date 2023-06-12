/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './schema/customer.schema';
import { Model } from 'mongoose';
import { customerDTO } from './dto/createCustomer.dto';
import { catchReturnError, createDataResponse } from '../utils/responseData';
import * as bcrypt from 'bcrypt';
import { TicketService } from '../Ticket/ticket.service';
import { TicketDTO } from '../Ticket/dto/createTicket.dto';
import { commentOnSupportRequestDTO, supportRequestDTO } from './dto/createSupportRequest.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>, private ticketService: TicketService) {}

  async createCustomer(params: customerDTO) {
    try {
      const checkEmail = await this.customerModel.findOne({
        email: params.email,
      });
      if (checkEmail) {
        throw new BadRequestException('Email already exist');
      }
      params.password = await bcrypt.hash(params.password, 10);
      return createDataResponse(this.customerModel, params, 'Customer');
    } catch (error) {
      return catchReturnError(error);
    }
  }

  // create a support request
  async createSupportRequest(params: supportRequestDTO, customerId: string) {
    try {
      return await this.ticketService.createTicket({ ...params, customer: customerId });
    } catch (error) {
      console.log('err', error);
      return catchReturnError(error);
    }
  }

  // get all support request
  async allSupportRequests(customerId: string) {
    return await this.ticketService.customerTickets(customerId);
  }

  // get a support request
  async fetchSupportRequest(ticketId: string) {
    return await this.ticketService.findTicket(ticketId);
  }

  // comment on a support request
  async commentOnSupportRequest(params: commentOnSupportRequestDTO, customerId: string) {
    return await this.ticketService.customerComment({ ...params, customer: customerId });
  }
}
