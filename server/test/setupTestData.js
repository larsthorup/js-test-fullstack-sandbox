async function resetting ({db}) {
  await db.query(`
      delete from dream;
      alter sequence dream_id_seq restart;
      insert into dream (title) values ('Visit Albania');
      insert into dream (title) values ('Learn French');
    `);
}

module.exports = {
  resetting
};
