require('dotenv/config');

module.exports = {
  dialect: process.env.SQL_DIALECT,
  host: process.env.SQL_HOST,
  username: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
