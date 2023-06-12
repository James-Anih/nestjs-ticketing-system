/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from '../Agent/schema/agent.schema';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { AgentStrategy } from '../Auth/strategy/agent.strategy';
import { TicketModule } from '../Ticket/ticket.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]), TicketModule],
  providers: [AgentService],
  controllers: [AgentController],
})
export class AgentModule {}
