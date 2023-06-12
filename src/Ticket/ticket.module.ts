/* eslint-disable @typescript-eslint/no-unused-vars */
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Ticket, TicketSchema } from './schema/ticket.schema';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Comments, CommentSchema } from './schema/ticket_comments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: Comments.name, schema: CommentSchema },
    ]),
  ],
  providers: [TicketService],
  controllers: [TicketController],
  exports: [TicketService],
})
export class TicketModule {}
