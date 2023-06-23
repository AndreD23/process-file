import { Injectable } from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { Creator } from './entities/creator.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionType } from '../transactions/entities/transaction.entity';

@Injectable()
export class CreatorsService {
  constructor(
    @InjectModel(Creator)
    private creatorModel: typeof Creator,
  ) {}

  create(createCreatorDto: CreateCreatorDto) {
    return this.creatorModel.create(createCreatorDto as any);
  }

  findAll() {
    return this.creatorModel.findAll();
  }

  findOne(id: number) {
    return this.creatorModel.findOne({
      where: { id },
    });
  }

  async updateAccountBallance(
    type: number,
    creatorName: string,
    value: number,
  ) {
    const [creator, created] = await this.creatorModel.findOrCreate({
      where: {
        name: creatorName,
      },
      defaults: {
        account_balance: 0,
      },
    });

    let accountBalance = Number(creator.get('account_balance'));

    switch (Number(type)) {
      case Number(TransactionType.PRODUCER_SALE):
      case Number(TransactionType.AFFILIATE_SALE):
      case Number(TransactionType.RECEIVED_COMMISSION):
        accountBalance += Number(value);
        break;
      case Number(TransactionType.PAID_COMMISSION):
        accountBalance -= Number(value);
        break;
    }

    await creator.update({
      account_balance: accountBalance,
    });
  }
}
