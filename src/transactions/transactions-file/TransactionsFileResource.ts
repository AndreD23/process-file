import { TransactionFile } from './entities/transaction-file.entity';
import { join } from 'path';
// import ComponentLoader from 'adminjs/src/backend/utils/component-loader';
// import { componentLoader } from './component-loader';

const adminUploadImport = '@adminjs/upload';

// const filePath = join(__dirname, '../../public/upload/transaction-files');
const filePath = join(__dirname, '../../../upload/transaction-files');
//
const localProvider = {
  bucket: filePath,
};

// const awsProvider = {
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
//   bucket: process.env.AWS_BUCKET,
// };
//
// console.log('#############');
// console.log(__dirname);
// console.log('#############');
//
// async function loadComponent() {
//   const { ComponentLoader } = await import('adminjs');
//   return new ComponentLoader();
// }
//
// const componentLoader = loadComponent();
//
// console.log(await componentLoader.add());

//
// componentLoader.then({});

export default {
  resource: TransactionFile,
  options: {
    navigation: 'Transações',
    properties: {
      id: {
        position: 1,
      },
      filename: {
        position: 2,
        isRequired: true,
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
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
    features: [
      import(adminUploadImport).then((uploadFileFeature) => {
        uploadFileFeature.default({
          // componentLoader,
          provider: {
            local: localProvider,
            // aws: awsProvider,
          },
          properties: {
            key: 'path',
            bucket: 'folder',
            mimetype: 'type',
            size: 'size',
            filename: 'filename',
            file: 'attachment',
          },
          validation: {
            mimeTypes: ['text/plain'],
          },
        });
      }),
    ],
    // actions: {
    //   myCustomAction: {
    //     actionType: 'record',
    //     component: Components.MyCustomAction, // see "Writing your own Components"
    //     handler: (request, response, context) => {
    //       const { record, currentAdmin } = context;
    //       return {
    //         record: record.toJSON(currentAdmin),
    //         msg: 'Hello world',
    //       };
    //     },
    //   },
    // },
  },
};
