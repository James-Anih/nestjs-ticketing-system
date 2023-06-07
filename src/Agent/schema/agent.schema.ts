// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AgentDocument = Agent & Document;

@Schema({ timestamps: true })
export class Agent {
  _id: string;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;

  @Prop({ type: String, required: true })
  password: string;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
