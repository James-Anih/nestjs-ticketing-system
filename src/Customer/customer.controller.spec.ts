import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../Customer/customer.controller';
import { TicketModule } from '../Ticket/ticket.module';
import { CustomerService } from './customer.service';

jest.mock('./customer.service.ts');
jest.mock('../Ticket/ticket.module.ts');
describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TicketModule],
      controllers: [CustomerController],
      providers: [CustomerService],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
