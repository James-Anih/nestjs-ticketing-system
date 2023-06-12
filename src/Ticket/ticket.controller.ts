/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDTO } from './dto/createTicket.dto';

@Controller('api/support_request')
export class TicketController {}
