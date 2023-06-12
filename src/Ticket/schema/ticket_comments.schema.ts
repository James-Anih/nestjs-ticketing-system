/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Customer } from '../../Customer/schema/customer.schema';
import { Agent } from '../../Agent/schema/agent.schema';
import { Ticket } from './ticket.schema';

export type commentDocument = Comments & Document;

@Schema({ timestamps: true })
export class Comments {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' })
  ticket: Ticket;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customer: Customer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Agent' })
  agent: Agent;

  @Prop({ type: String, required: true })
  comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comments);
