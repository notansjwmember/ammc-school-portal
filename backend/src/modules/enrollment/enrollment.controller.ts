import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Post,
   Put,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from './enrollment.schema';
import { Types } from 'mongoose';
import { CreateEnrollmentDto } from './enrollment.dto';

@Controller('enrollment')
export class EnrollmentController {
   constructor(private readonly enrollmentService: EnrollmentService) {}

   @Post('/batch-enroll')
   async batchEnroll(
      @Body()
      body: {
         courseIds: Types.ObjectId[];
         sectionIds: Types.ObjectId[];
         courseTypes: string[];
         studentId: string;
         schoolYear: string;
         semester: number;
         tuitionFee: { totalDue: number; discounts: { amount: number }[] };
      },
   ) {
      return this.enrollmentService.batchEnroll(
         body.courseIds,
         body.sectionIds,
         body.courseTypes,
         body.studentId,
         body.schoolYear,
         body.semester,
         body.tuitionFee,
      );
   }

   @Get()
   async findAll(): Promise<Enrollment[]> {
      return this.enrollmentService.findAll();
   }

   @Get(':id')
   async findOne(@Param('id') id: Types.ObjectId): Promise<Enrollment> {
      return this.enrollmentService.findOne(id);
   }

   @Put(':id')
   async update(
      @Param('id') id: Types.ObjectId,
      @Body() newData: Partial<CreateEnrollmentDto>,
   ): Promise<Enrollment> {
      return this.enrollmentService.update(id, newData);
   }

   @Delete(':id')
   async delete(@Param('id') id: Types.ObjectId): Promise<Enrollment> {
      return this.enrollmentService.delete(id);
   }

   @Post('/seed')
   async seedTuition() {
      await this.enrollmentService.seedTuition();
   }
}
