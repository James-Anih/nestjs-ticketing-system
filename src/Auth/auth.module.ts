import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Agent } from 'http';
import { AgentSchema } from '../Agent/schema/agent.schema';
import { Customer, CustomerSchema } from '../Customer/schema/customer.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AgentStrategy } from './strategy/agent.strategy';
import { CustomerStrategy } from './strategy/customer.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Agent.name, schema: AgentSchema },
      { name: Customer.name, schema: CustomerSchema },
    ]),
    JwtModule.registerAsync({
      useFactory: async (configSerivce: ConfigService) => ({
        secret: configSerivce.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configSerivce.get<string>('EXPIREIN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AgentStrategy, CustomerStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
