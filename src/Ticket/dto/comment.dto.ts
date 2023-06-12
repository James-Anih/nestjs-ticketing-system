/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class agentCommentDTO {
  @IsNotEmpty()
  @IsString()
  agent: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsString()
  ticket: string;
}

export class customerCommentDTO {
  @IsNotEmpty()
  @IsString()
  customer: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsString()
  ticket: string;
}
