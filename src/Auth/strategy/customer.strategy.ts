import { ExtractJwt, Strategy } from 'passport-jwt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Customer, CustomerDocument } from '../../Customer/schema/customer.schema';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InjectModel } from '@nestjs/mongoose';
import { JwtObjectType } from '../auth.service';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CustomerStrategy extends PassportStrategy(Strategy, 'jwt') {
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
