import { Test, TestingModule } from '@nestjs/testing';
import { AgentController } from '../Agent/agent.controller';
import { AgentService } from '../Agent/agent.service';

jest.mock('./agent.service.ts');
describe('AgentController', () => {
  let controller: AgentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentController],
      providers: [AgentService],
    }).compile();

    controller = module.get<AgentController>(AgentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
