import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('customer/login')
  async customerLogin(@Body() params: LoginDTO) {
    return this.service.customerLogin(params);
  }

  @Post('agent/login')
  async agentLogin(@Body() params: LoginDTO) {
    return this.service.agentLogin(params);
  }
}
