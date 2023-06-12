/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Customer, CustomerDocument } from '../../Customer/schema/customer.schema';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtObjectType } from '../auth.service';

@Injectable()
export class CustomerStrategy extends PassportStrategy(Strategy, 'customer') {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtObjectType) {
    const { sub } = payload;
    const customer = await this.customerModel.findById(sub);
    if (!customer) {
      throw new UnauthorizedException();
    }
    return customer;
  }
}
