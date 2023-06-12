/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AgentService } from './agent.service';
import { createAgentDTO } from '../Agent/dto/createAgent.dto';
import { AgentAuthGuard } from '../Auth/guards/agent-auth.guard';
import { isAdmin } from '../Auth/guards/admin.guard';
import { commentOnSupportRequestDTO } from '../Customer/dto/createSupportRequest.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/agents')
export class AgentController {
  constructor(private readonly service: AgentService) {}

  @Post('/create')
  async addNewAgent(@Body() params: createAgentDTO) {
    return this.service.creatAgent(params);
  }

  @UseGuards(AuthGuard('agent'))
  @Get('/')
  async getAgents() {
    return this.service.agents();
  }

  @Get('/support_request/all')
  async supportRequests() {
    return this.service.allSupportRequests();
  }

  @UseGuards(AuthGuard('agent'))
  @Post('/support_request/comment')
  async comment(@Body() params: commentOnSupportRequestDTO, @Req() req: Request) {
    const authAgent: any = req.user;
    return this.service.comment(params, authAgent._id);
  }
}
