import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Agent } from 'http';
import mongoose, { Model } from 'mongoose';
import { AgentDocument } from '../Agent/schema/agent.schema';
import { Customer, CustomerDocument } from '../Customer/schema/customer.schema';
import { LoginDTO } from './dto/login.dto';
import { compare } from 'bcrypt';
import { loginResponse } from '../utils/responseData';

export type JwtObjectType = {
  sub: mongoose.Types.ObjectId;
};
@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private config: ConfigService, @InjectModel(Agent.name) private readonly agentModel: Model<AgentDocument>, @InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>) {}

  // customer login
  async customerLogin(params: LoginDTO) {
    // extract login details and find customer account
    const { email, password } = params;
    const customer = await this.findByEmail(email, this.customerModel);
    if (!customer) throw new NotFoundException('Account with email not found');
    const passwordMatch = await compare(password, customer.password);
    if (!passwordMatch) throw new BadRequestException('Email and password mismatch');
    //   generate jwt token
    const token = await this.signToken(customer._id);

    //   login user and return data
    return await loginResponse(this.customerModel, customer._id, 'Customer', token);
  }

  // agent login
  async agentLogin(params: LoginDTO) {
    const { email, password } = params;
    const agent = await this.findByEmail(email, this.agentModel);
    if (!agent) throw new NotFoundException('Account with email found');
    const passwordMatch = await compare(password, agent.password);
    if (!passwordMatch) throw new BadRequestException('Email and password mismatch');
    const token = await this.signToken(agent._id);
    return await loginResponse(this.agentModel, agent._id, 'Agent', token);
  }

  findByEmail(email: string, model: Model<any>) {
    return model.findOne({ email });
  }

  signToken(id: mongoose.Types.ObjectId): Promise<string> {
    const jwtSecret = this.config.get<string>('JWT_SECRET');
    const payload: JwtObjectType = {
      sub: id,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: this.config.get<string>('EXPIREIN'),
      secret: jwtSecret,
    });
  }
}
