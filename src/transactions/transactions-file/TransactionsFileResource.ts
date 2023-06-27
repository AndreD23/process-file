import { TransactionFile } from './entities/transaction-file.entity';
import { join } from 'path';
import UploadProvider from '../../providers/UploadProvider';

const uploadFeature = require('@adminjs/upload');

const localProvider = {
  bucket: join(__dirname, '../../../upload/transaction-files'),
};

export default {
  resource: TransactionFile,
  options: {
    navigation: 'Transações',
    properties: {
      id: {
        position: 1,
      },
      status: {
        position: 2,
        availableValues: [
          { value: 'PENDING', label: 'Pendente' },
          { value: 'PROCESSING', label: 'Em processamento' },
          { value: 'DONE', label: 'Finalizado' },
          { value: 'ERROR', label: 'Processado com erro' },
        ],
      },
      notes: {
        position: 3,
        type: 'textarea',
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
      createdAt: {
        position: 4,
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      updatedAt: {
        position: 5,
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
      attachment: {
        position: 6,
        isVisible: { list: false, filter: false, show: false, edit: true },
      },
      filename: {
        isVisible: false,
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
  },
  features: [
    uploadFeature({
      provider: new UploadProvider(localProvider),
      properties: {
        key: 'path',
        bucket: 'folder',
        mimetype: 'type',
        size: 'size',
        filename: 'filename',
        file: 'attachment',
      },
      uploadPath: (record, filename) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        return `file-${uniqueSuffix}`;
      },
      validation: {
        mimeTypes: ['text/plain'],
      },
    }),
  ],
};
