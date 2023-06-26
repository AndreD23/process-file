import { TransactionFile } from './entities/transaction-file.entity';
import { join } from 'path';

// const adminUploadImport = '@adminjs/upload';

const uploadFeature = require('@adminjs/upload');

// const localProvider = {
//   bucket: join(__dirname, '../../../upload/transaction-files'),
// };

export default {
  resource: TransactionFile,
  options: {
    navigation: 'Transações',
    properties: {
      id: {
        position: 1,
      },
      filename: {
        isVisible: false,
        // position: 2,
        // isRequired: true,
      },
      status: {
        position: 3,
        availableValues: [
          { value: 'PENDING', label: 'Pendente' },
          { value: 'PROCESSING', label: 'Em processamento' },
          { value: 'DONE', label: 'Finalizado' },
          { value: 'ERROR', label: 'Processado com erro' },
        ],
      },
      notes: {
        position: 4,
        type: 'textarea',
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
      createdAt: {
        position: 5,
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      updatedAt: {
        position: 6,
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
      attachment: {
        type: 'file',
        position: 7,
      },
      path: {
        isVisible: false,
      },
      folder: {
        isVisible: false,
      },
      type: {
        isVisible: false,
      },
      size: {
        isVisible: false,
      },
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
    features: [
      uploadFeature({
        provider: {
          local: {
            bucket: join(__dirname, '../../../upload/transaction-files'),
          },
          // aws: awsProvider,
        },
        properties: {
          key: 'path',
          bucket: 'folder',
          filePath: 'folder',
          mimetype: 'type',
          size: 'size',
          filename: 'filename',
          file: 'file',
        },
        // validation: {
        //   mimeTypes: ['text/plain'],
        // },
      }),
    ],
  },
};
