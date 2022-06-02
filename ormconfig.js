module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "postgres",
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/common/migrations/*.js"],
  cli: {
    migrationDir: "src/common/migrations",
  },
};

// Более лучшая версия конфига миграций, смотреть в соседнем проекте
// https://github.com/alexeyinn/nestjs-real-world-project/blob/master/src/ormconfig.ts
