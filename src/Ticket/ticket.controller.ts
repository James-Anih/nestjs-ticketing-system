/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDTO } from './dto/createTicket.dto';

@Controller('api/support_request')
export class TicketController {
  constructor(private readonly service: TicketService) {}

  async create(@Body() params: TicketDTO) {
    return this.service.createTicket(params);
  }
}
