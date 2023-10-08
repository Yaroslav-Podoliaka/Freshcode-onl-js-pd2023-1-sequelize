module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "library_2023_10_08",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
      undefined: true
    }
  },
  test: {
    // "username": "root",
    // "password": null,
    // "database": "database_test",
    // "host": "127.0.0.1",
    // "dialect": "mysql"
  },
  production: {
    // "username": "root",
    // "password": null,
    // "database": "database_production",
    // "host": "127.0.0.1",
    // "dialect": "mysql"
  }
}
