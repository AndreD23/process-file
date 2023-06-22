import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TransactionsFileService } from './transactions-file.service';
import { CreateTransactionFileDto } from './dto/create-transaction-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const UPLOAD_DIR = './upload/transaction-files/';
const MAX_UPLOAD_SIZE = 10; // MB

const defaultConfig = diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'file-' + uniqueSuffix);
  },
});

@Controller('transactions-file')
export class TransactionsFileController {
  constructor(private readonly transactionsService: TransactionsFileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: defaultConfig }))
  create(
    @Body() createTransactionDto: CreateTransactionFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.transactionsService.create({
      filename: file.filename,
    });
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }
}
