const commonProps = {
  status: 'Situação',
  createdAt: 'Criação',
  updatedAt: 'Atualização',
};

const translations = {
  actions: {
    new: 'Criar novo',
    edit: 'Editar',
    show: 'Exibir',
    delete: 'Apagar',
    bulkDelete: 'Apagar todos',
    list: 'Listagem',
  },
  buttons: {
    save: 'Salvar',
    addNewItem: 'Adicionar novo item',
    filter: 'Filtrar',
    applyChanges: 'Aplicar alterações',
    resetFilter: 'Limpar',
    confirmRemovalMany: 'Deseja remover {{count}} registro?',
    confirmRemovalMany_plural: 'Deseja remover {{count}} registros?',
    logout: 'Logout',
    login: 'Login',
    seeTheDocumentation: 'Veja: <1>documentação</1>',
    createFirstRecord: 'Criar o primeiro registro',
    resetPassword: 'Redefinir senha',
  },
  labels: {
    navigation: 'Menu',
    pages: 'Páginas',
    selectedRecords: 'Selecionados ({{selected}})',
    filters: 'Filtros',
    adminVersion: 'Admin: {{version}}',
    appVersion: 'App: {{version}}',
    loginWelcome: 'Bem vindo(a)',
    users: 'Usuários',
    creators: 'Criadores',
    transactions: 'Transações',
    transactions_file: 'Arquivo de Transações',
  },
  properties: {
    length: 'Tamanho',
    from: 'De',
    to: 'Até',
  },
  resources: {
    users: {
      actions: {
        resetPassword: 'Redefinir senha',
      },
      properties: {
        id: 'ID',
        name: 'Nome',
        email: 'E-mail',
        password: 'Senha',
        passwordHash: 'Senha criptografada',
        role: 'Perfil',
        ...commonProps,
      },
    },
    creators: {
      properties: {
        id: 'ID',
        name: 'Nome',
        account_balance: 'Saldo',
        ...commonProps,
      },
    },
    transactions: {
      properties: {
        id: 'ID',
        product: 'Produto',
        seller: 'Vendedor',
        value: 'Valor',
        type: 'Tipo',
        transaction_file: 'Arquivo',
        ...commonProps,
      },
    },
    transactions_file: {
      properties: {
        id: 'ID',
        filename: 'Nome do Arquivo',
        notes: 'Notas',
        ...commonProps,
      },
    },
  },
  messages: {
    successfullyBulkDeleted: '{{count}} registro removido com sucesso',
    successfullyBulkDeleted_plural: '{{count}} registros removidos com sucesso',
    successfullyDeleted: 'Registro apagado com sucesso',
    successfullyUpdated: 'Registro atualizado com sucesso',
    thereWereValidationErrors: 'Existem erros de validação - veja abaixo',
    forbiddenError:
      'Você não tem permissão para executar a ação {{actionName}} de {{resourceId}}',
    anyForbiddenError: 'Você não tem permissão para executar essa ação',
    successfullyCreated: 'Registro criado com sucesso',
    bulkDeleteError:
      'Erro ao apagar o registro, verifique o console para mais detalhes',
    errorFetchingRecords:
      'Erro ao carregar os registros, verifique o console para mais detalhes',
    errorFetchingRecord:
      'Erro ao carregar o registro, verifique o console para mais detalhes',
    noRecordsSelected: 'Você não selecionou um registro',
    theseRecordsWillBeRemoved: 'O seguinte registro será apagado',
    theseRecordsWillBeRemoved_plural: 'Os seguintes registros serão apagados',
    pickSomeFirstToRemove:
      'Para remover um registro, você deve selecioná-lo primeiro',
    error404Resource: '{{resourceId}} não foi encontrado',
    error404Action:
      '{{resourceId}} não possuí a ação {{actionName}} ou você não tem permissão para executá-la!',
    error404Record:
      '{{resourceId}} não possuí o registro #{{recordId}} ou você não tem permissão para visualiza-lo!',
    seeConsoleForMore:
      'Veja o console de desenvolvimento para mais detalhes...',
    noActionComponent: 'Você não implementou uma ação para este componente',
    noRecordsInResource: 'Não existem registros para esse recurso',
    noRecords: 'Sem registros',
    confirmDelete: 'Você tem certeza que deseja remover esse registro?',
    loginWelcome: 'Sistema de gerenciamento de transações',
    email: 'Email',
    password: 'Senha',
    login: 'Entrar',
    invalidCredentials: 'Email e/ou senha inválido',
    resetPasswordMessage:
      'Uma nova senha aleatória será gerada e atribuída para este usuário, para prosseguir clique no botão "Redefinir senha".',
    newPasswordMessage: 'Nova senha "{{newPassword}}" atribuída ao usuário.',
    newPasswordMessageError: 'Erro ao redefinir a senha automaticamente.',
  },
};

export default {
  locale: {
    language: 'pt-BR',
    // availableLanguages: ['pt-BR'],
    // translations: {
    //   resources: {
    //     'pt-BR': translations_pt_BR,
    //   },
    // },
    translations,
  },
};
