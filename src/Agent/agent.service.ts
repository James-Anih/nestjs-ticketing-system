/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent, AgentDocument } from '../Agent/schema/agent.schema';
import { createAgentDTO } from '../Agent/dto/createAgent.dto';
import { catchReturnError, sendResponse } from '../utils/responseData';
import * as bcrypt from 'bcrypt';
import { createDataResponse } from '../utils/responseData';
import { TicketService, TicketStatus } from '../Ticket/ticket.service';
import { commentOnSupportRequestDTO } from '../Customer/dto/createSupportRequest.dto';

@Injectable()
export class AgentService {
  constructor(@InjectModel(Agent.name) private readonly agentModel: Model<AgentDocument>, private ticketservice: TicketService) {}

  async creatAgent(params: createAgentDTO) {
    try {
      const checkEmail = await this.agentModel.findOne({
        email: params.email,
      });
      if (checkEmail) {
        throw new BadRequestException('Email already exist');
      }
      params.password = await bcrypt.hash(params.password, 10);
      return createDataResponse(this.agentModel, params, 'Agent');
    } catch (error) {
      return catchReturnError(error);
    }
  }

  // view all agents
  async agents() {
    try {
      const agents = await this.agentModel.find().select({ password: 0 });
      return sendResponse(200, agents);
    } catch (error) {
      return catchReturnError(error);
    }
  }

  // view all support requests
  async allSupportRequests() {
    try {
      return await this.ticketservice.tickets();
    } catch (error) {
      return catchReturnError(error);
    }
  }

  // comment on support request
  async comment(params: commentOnSupportRequestDTO, agentId: string) {
    try {
      return await this.ticketservice.agentComment({ ...params, agent: agentId });
    } catch (error) {
      return catchReturnError(error);
    }
  }

  // close a support request
  async markSupportRequestAsClose(ticketId: string, agentId: string) {
    try {
      return await this.ticketservice.updateTicketStatus(ticketId, agentId, TicketStatus.CLOSED);
    } catch (error) {
      return catchReturnError(error);
    }
  }

  // generate report for closed tickets in last one month
  async closedTicketReport() {
    return await this.ticketservice.ticketReport();
  }
}
