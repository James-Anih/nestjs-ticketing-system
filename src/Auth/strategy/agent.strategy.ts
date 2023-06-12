/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Agent, AgentDocument } from '../../Agent/schema/agent.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtObjectType } from '../auth.service';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AgentStrategy extends PassportStrategy(Strategy, 'agent') {
  constructor(@InjectModel(Agent.name) private agentModel: Model<AgentDocument>, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtObjectType) {
    const { sub } = payload;
    const agent = await this.agentModel.findById(sub);
    if (!agent) {
      throw new UnauthorizedException();
    }
    return agent;
  }
}
