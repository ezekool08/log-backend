exports.up = pgm => {
  pgm.createTable('log', {
    id: 'id',
    inserted_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('now()')
    },
    json: {
      type: 'json',
      notNull: true
    }
  });
};

exports.down = pgm => {
  pgm.dropTable('log');
};
