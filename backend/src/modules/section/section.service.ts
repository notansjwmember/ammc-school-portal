import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Section } from './section.schema';
import { Model, Types } from 'mongoose';
import { CreateSectionDto } from './section.dto';

@Injectable()
export class SectionService {
   constructor(
      @InjectModel(Section.name)
      private SectionModel: Model<Section>,
   ) {}

   async create(createSectionDto: CreateSectionDto): Promise<Section> {
      const newSection = new this.SectionModel(createSectionDto);
      return newSection.save();
   }

   async findAll(): Promise<Section[]> {
      return this.SectionModel.find().exec();
   }

   async findOne(id: Types.ObjectId): Promise<Section> {
      return this.SectionModel.findById(id).exec();
   }

   async update(
      id: Types.ObjectId,
      newData: Partial<CreateSectionDto>,
   ): Promise<Section> {
      return this.SectionModel.findByIdAndUpdate(id, newData, {
         new: true,
      }).exec();
   }

   async delete(id: Types.ObjectId): Promise<Section> {
      return this.SectionModel.findByIdAndDelete(id).exec();
   }

   async seed(): Promise<void> {
      const dummyBlocks: CreateSectionDto[] = [
         {
            description: 'Section A',
            isActive: true,
         },
         {
            description: 'Section B',
            isActive: true,
         },
         {
            description: 'Section C',
            isActive: false,
         },
         {
            description: 'Section D',
            isActive: true,
         },
         {
            description: 'Section E',
            isActive: true,
         },
      ];

      try {
         await this.SectionModel.insertMany(dummyBlocks);
         console.log('Dummy blocks inserted successfully');
      } catch (error) {
         console.error('Error inserting dummy blocks:', error);
      }
   }
}
