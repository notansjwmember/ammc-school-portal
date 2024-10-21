import {
   Assignment,
   AssignmentSchema,
} from 'src/modules/assignment/assignment.schema';
import {
   BlockSection,
   BlockSectionSchema,
} from 'src/modules/block-section/block-section.schema';
import { Course, CourseSchema } from 'src/modules/course/course.schema';
import {
   Enrollment,
   EnrollmentSchema,
} from 'src/modules/enrollment/enrollment.schema';
import { Finance, FinanceSchema } from 'src/modules/finance/finance.schema';
import {
   Instructor,
   InstructorSchema,
} from 'src/modules/instructor/instructor.schema';
import {
   Notification,
   NotificationSchema,
} from 'src/modules/notification/notification.schema';
import { Program, ProgramSchema } from 'src/modules/program/program.schema';
import { Schedule, ScheduleSchema } from 'src/modules/schedule/schedule.schema';
import { User, UserSchema } from 'src/modules/user/user.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
   imports: [
      MongooseModule.forRoot(process.env.MONGODB_URI),
      MongooseModule.forFeature([
         { name: User.name, schema: UserSchema },
         { name: BlockSection.name, schema: BlockSectionSchema },
         { name: Course.name, schema: CourseSchema },
         { name: Program.name, schema: ProgramSchema },
         { name: Instructor.name, schema: InstructorSchema },
         { name: Enrollment.name, schema: EnrollmentSchema },
         { name: Schedule.name, schema: ScheduleSchema },
         { name: Assignment.name, schema: AssignmentSchema },
         { name: Notification.name, schema: NotificationSchema },
         { name: Finance.name, schema: FinanceSchema },
      ]),
   ],
   exports: [MongooseModule],
})
export class DatabaseModule {}