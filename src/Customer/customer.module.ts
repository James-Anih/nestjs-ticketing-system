/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schema/customer.schema';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TicketModule } from '../Ticket/ticket.module';
import { CustomerStrategy } from '../Auth/strategy/customer.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]), TicketModule],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
