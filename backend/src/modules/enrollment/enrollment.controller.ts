import {
   BadRequestException,
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

   @Post('/enroll')
   async enroll(@Body() courseId: Types.ObjectId, studentId: string) {
      try {
         const student = await this.enrollmentService.enroll(
            courseId,
            studentId,
         );
         return { success: true, data: student };
      } catch (error) {
         throw new BadRequestException(error.message);
      }
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
}
