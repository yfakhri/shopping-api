exports.up = (pgm) => {
    pgm.createTable('shopping', {
      id: {
        type: 'serial',
        primaryKey: true,
      },
      name: {
        type: 'text',
        notNull: true,
      },
      createddate: {
        type: 'DATE',
        notNull: true,
      }
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('shopping');
  };
  