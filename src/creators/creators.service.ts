import { Injectable } from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { Creator } from './entities/creator.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionType } from '../transactions/entities/transaction.entity';

@Injectable()
export class CreatorsService {
  constructor(
    @InjectModel(Creator)
    private creatorModel: typeof Creator,
  ) {}

  /**
   * Responsable for create a creator row at database
   * @param createCreatorDto
   */
  create(createCreatorDto: CreateCreatorDto) {
    return this.creatorModel.create(createCreatorDto as any);
  }

  /**
   * Get all creators of the database
   */
  findAll() {
    return this.creatorModel.findAll();
  }

  /**
   * Get one creator of the database by id
   * @param id Creator Id at database
   */
  findOne(id: number) {
    return this.creatorModel.findOne({
      where: { id },
    });
  }

  /**
   * Responsable for update a Account Balance
   * Will be updated according to the type of transaction performed
   *
   * @param type Transaction type. See TransactionType enum for reference.
   * @param creatorName Name of the creator to be updated. If the creator is not found, a new record is created.
   * @param value Amount to be added or subtracted according to the type of transaction
   */
  async updateAccountBalance(type: number, creatorName: string, value: number) {
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
