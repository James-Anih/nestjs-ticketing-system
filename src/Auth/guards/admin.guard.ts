/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Agent, AgentDocument } from '../../Agent/schema/agent.schema';
import { Model } from 'mongoose';

@Injectable()
export class isAdmin implements CanActivate {
  constructor(@InjectModel(Agent.name) private agentModel: Model<AgentDocument>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    if (!user.isAdmin) {
      return false;
    }
    return true;
  }
}
