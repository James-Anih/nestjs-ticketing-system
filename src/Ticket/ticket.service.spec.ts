/* eslint-disable @typescript-eslint/no-unused-vars */
import { TicketService } from './ticket.service';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('./ticket.service.ts');
describe('TicketService', () => {
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketService],
    }).compile();

    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
