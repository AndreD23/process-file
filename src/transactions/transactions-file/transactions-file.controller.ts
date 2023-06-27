import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TransactionsFileService } from './transactions-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import 'dotenv/config';

// Upload folder config
// Handle location folder and file name to avoid files with same name
const defaultConfig = diskStorage({
  destination: process.env.UPLOAD_DIR,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'file-' + uniqueSuffix);
  },
});

@Controller('transactions-file')
export class TransactionsFileController {
  constructor(
    private readonly transactionFileService: TransactionsFileService,
  ) {}

  /**
   * Create a file register
   * Insert at table transaction_file
   * Insert file at UPLOAD_DIR env folder
   * @param file
   */
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: defaultConfig }))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.transactionFileService.create({
      path: file.filename,
    });
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
