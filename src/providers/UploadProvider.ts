import * as fs from 'fs';
import { move } from 'fs-extra';
import { join, dirname } from 'path';
import { UploadedFile } from 'adminjs';
import { BaseProvider } from '@adminjs/upload';

export default class UploadProvider extends BaseProvider {
  constructor(options) {
    super(options.bucket);
    if (!fs.existsSync(options.bucket)) {
      throw new Error(
        `directory: "${options.bucket}" does not exists. Create it before running LocalAdapter`,
      );
    }
  }

  // * Fixed this method because original does rename instead of move and it doesn't work with docker volume
  public async upload(file: UploadedFile, key: string): Promise<any> {
    const filePath = this.path(key); // adjusting file path according to OS
    await fs.promises.mkdir(dirname(filePath), { recursive: true });
    await move(file.path, filePath, { overwrite: true });
  }

  public async delete(key: string, bucket: string): Promise<any> {
    await fs.promises.unlink(this.path(key, bucket));
  }

  // eslint-disable-next-line class-methods-use-this
  public path(key: string, bucket?: string): string {
    return `${join(this.bucket, key)}`;
  }
}
