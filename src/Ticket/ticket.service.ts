/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from './schema/ticket.schema';
import mongoose, { Model, Schema } from 'mongoose';
import { Comments, commentDocument } from './schema/ticket_comments.schema';
import { TicketDTO } from './dto/createTicket.dto';
import { catchReturnError, createDataResponse, sendResponse } from '../utils/responseData';
import { ObjectId } from 'mongodb';
import { agentCommentDTO, customerCommentDTO } from './dto/comment.dto';

export enum TicketStatus {
  PENDING = 'pending', // ticket is pending when it not yet assigned to an agent
  PROCESSING = 'processing', // ticket is processing when it been assigned to an agent
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum TicketPriority {
  HIGH = 'High',
  LOW = 'low',
  MEDIUM = 'medium',
}

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket.name) private readonly ticketModel: Model<TicketDocument>, @InjectModel(Comments.name) private readonly commentModel: Model<commentDocument>) {}

  async createTicket(params: TicketDTO) {
    try {
      return createDataResponse(this.ticketModel, params, 'Ticket');
    } catch (error) {
      console.log('err', error);
      return catchReturnError(error);
    }
  }

  // get all tickets
  async tickets() {
    try {
      const tickets = await this.ticketModel.find().populate('customer', 'firstName');
      return sendResponse(200, tickets);
    } catch (error) {
      return catchReturnError(error);
    }
  }

  async customerTickets(customerId: string) {
    try {
      const tickets = await this.ticketModel.find({
        customer: customerId,
      });
      return sendResponse(200, tickets);
    } catch (error) {
      console.log('err', error);
      return catchReturnError(error);
    }
  }

  // commenting on a ticket
  async agentComment(params: agentCommentDTO) {
    try {
      const ticket = await this.ticketModel.findById(params.ticket);
      if (!ticket) {
        throw new BadRequestException('Ticket not found');
      }

      if (ticket.status == TicketStatus.CLOSED) {
        throw new BadRequestException('Ticket has been closed by an agent');
      }

      if (ticket.status == TicketStatus.RESOLVED) {
        throw new BadRequestException('Ticket has been resolved');
      }

      const comment = await this.commentModel.create(params);
      if (ticket.status == TicketStatus.PENDING) {
        ticket.status = TicketStatus.PROCESSING;
        ticket.save();
      }
      return sendResponse(200, comment);
    } catch (error) {
      return catchReturnError(error);
    }
  }

  async customerComment(params: customerCommentDTO) {
    try {
      const ticket = await this.ticketModel.findById(params.ticket);
      if (!ticket) {
        throw new BadRequestException('Ticket not found');
      }

      if (ticket.status == TicketStatus.PENDING) {
        throw new BadRequestException('Comment cannot be made for no agent has pickup this request');
      }
      if (ticket.status == TicketStatus.CLOSED) {
        throw new BadRequestException('Ticket has been closed by an agent');
      }

      if (ticket.status == TicketStatus.RESOLVED) {
        throw new BadRequestException('Ticket has been resolved');
      }
      const comment = await this.commentModel.create(params);
      return sendResponse(200, comment);
    } catch (error) {
      return catchReturnError(error);
    }
  }

  async findTicket(ticketId: string) {
    const ticket = await this.ticketModel.findById(ticketId).populate('comment');
    return sendResponse(200, ticket);
  }

  async updateTicketStatus(ticketId: string, agentId: string, status: string) {
    try {
      const ticket = await this.ticketModel.findById(ticketId);
      if (!ticket) {
        throw new BadRequestException('Ticket not found');
      }
      ticket.status = status;
      ticket.closedBy = agentId;
      ticket.save();

      return sendResponse(200, ticket);
    } catch (error) {
      return catchReturnError(error);
    }
  }
}
