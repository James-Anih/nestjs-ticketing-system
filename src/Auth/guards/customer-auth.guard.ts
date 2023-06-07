// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CustomerAuthGuard extends AuthGuard('jwt') {}
