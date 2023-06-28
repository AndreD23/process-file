import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { TransactionsFileService } from './transactions-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import 'dotenv/config';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateTransactionFileDto } from './dto/create-transaction-file.dto';

// Upload folder config
// Handle location folder and file name to avoid files with same name
const defaultConfig = diskStorage({
  destination: process.env.UPLOAD_DIR,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'file-' + uniqueSuffix);
  },
});

@ApiTags('transactions-file')
@Controller('transactions-file')
export class TransactionsFileController {
  constructor(
    private readonly transactionFileService: TransactionsFileService,
  ) {}

  /**
   * Create a file register
   * Insert at table transaction_file
   * Insert file at UPLOAD_DIR env folder
   * @param data
   * @param file
   */
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { storage: defaultConfig }))
  create(
    @Body() data: CreateTransactionFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.transactionFileService.create(file.filename);
  }

  @Get()
  findAll() {
    return this.transactionFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionFileService.findOne(+id);
  }
}
