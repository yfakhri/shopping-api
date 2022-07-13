exports.up = (pgm) => {
    // membuat tabel users
    pgm.createTable('users', {
      id: {
        type: 'serial',
        primaryKey: true,
      },
      username: {
        type: 'varchar(50)',
        unique: true,
        notNull: true,
      },
      password: {
        type: 'TEXT',
        notNull: true,
      },
      email: {
        type: 'TEXT',
        notNull: true,
      },
      phone: {
        type: 'varchar(50)',
        notNull: true,
      },
      country: {
        type: 'TEXT',
        notNull: true,
      },
      city: {
        type: 'TEXT',
        notNull: true,
      },
      postcode: {
        type: 'varchar(50)',
        notNull: true,
      },
      name: {
        type: 'TEXT',
        notNull: true,
      },
      address: {
        type: 'TEXT',
        notNull: true,
      },
    });
  };
  
  exports.down = (pgm) => {
    // menghapus tabel users
    pgm.dropTable('users');
  };
  