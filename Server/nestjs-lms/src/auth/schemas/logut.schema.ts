import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RevokedTokenDocument = RevokedToken & Document;

@Schema({ timestamps: true })
export class RevokedToken {
  @Prop({ required: true, unique: true })
  token!: string;

  @Prop()
  expiresAt!: Date;
}

export const RevokedTokenSchema = SchemaFactory.createForClass(RevokedToken);