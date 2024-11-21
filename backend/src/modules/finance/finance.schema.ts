import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Finance extends Document {
   @Prop({ required: true })
   studentId: string;

   @Prop({ type: String, required: true })
   schoolYear: string;

   @Prop({ type: Number, required: true, min: 1, max: 2 })
   semester: number;

   @Prop({
      type: {
         amount: { type: Number, default: 0 },
         discounts: [
            {
               discountType: {
                  type: String,
                  required: true,
               },
               amount: { type: Number, required: true },
               default: [],
            },
         ],
         totalDue: { type: Number, required: true },
      },
      required: true,
   })
   tuitionFee: {
      amount: number;
      discounts: { discountType: string; amount: number }[];
      totalDue: number;
   };

   @Prop({
      type: [
         {
            _id: { type: Types.ObjectId, auto: true },
            date: { type: Date, required: true },
            method: { type: String, required: true },
            amount: { type: Number, required: true },
            referenceNo: { type: String, required: false },
         },
      ],
   })
   transactions: {
      _id: Types.ObjectId;
      date: Date;
      method: string;
      amount: number;
      referenceNo?: string;
   }[];

   @Prop({ type: Number, required: true })
   outstandingBalance: number;

   @Prop({
      type: {
         status: { type: String, required: true, default: 'unpaid' },
         lastUpdated: { type: Date, required: true, default: Date.now },
      },
      required: true,
   })
   paymentStatus: {
      status: string;
      lastUpdated: Date;
   };
}

export const FinanceSchema = SchemaFactory.createForClass(Finance);
