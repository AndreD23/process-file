import { Module } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreatorsController } from './creators.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Creator } from './entities/creator.entity';

@Module({
  imports: [SequelizeModule.forFeature([Creator])],
  controllers: [CreatorsController],
  providers: [CreatorsService],
})
export class CreatorsModule {}
