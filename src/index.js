const db = require("./db/models");
// const { Op } = require('sequelize');

(async function () {
  const {Sequelize: { Op }} = db;
  // await db.sequelize.sync({force: true});
  const authors = [
    {
      full_name: "Ernest Hemingway",
      email: "e-h@gmail.com",
      createAT: new Date(),
      updateAt: new Date(),
    },
    {
      full_name: "Edgar Allan Poe",
      email: "e-a-p@gmail.com",
      createAT: new Date(),
      updateAt: new Date(),
    },
    {
      full_name: "Stephen King",
      email: "s-k@gmail.com",
      createAT: new Date(),
      updateAt: new Date(),
    },
  ];

  // Create
  // const createdGenre = await db.Genre.create(
  //   { title: "Biopic",
  //   createAT: new Date(),
  //   updateAt: new Date() },
  //   {
  //     raw: true,
  //     returning: ["id", "title"],
  //   }
  // );
  // console.log(createdGenre);

  // BulkCreate;
  // await db.Author.bulkCreate(authors, {
  //   raw: true,
  //   returning: ["id", "full_name", "email"],
  // });

  // const addedAuthor = await db.Author.create({
  //   full_name: 'new author',
  //   email: 's-k.gmail.com',
  // },
  // {
  //   raw: true,
  //   returning: 'id',
  // });

  // Update
  // const updatedAuthor = await db.Author.update(
  //   {email: "some@gmail.com"},
  // {where: {
  //   full_name: {
  //     [Op.like]: 'E%',
  //   }
  // }});
  // console.log(updatedAuthor);

  // Destroy
  // await db.Author.destroy({
  //   where: {
  //     // id: 1,
  //     id: {
  //       [Op.eq]: 1
  //     }
  //   }
  // });

  // FindAll
  // const genres = await db.Genre.findAll({
  //   where: {
  //     title: {
  //       [Op.like]: "D%",
  //     },
  //   },
  //   attributes: ["title"],
  //   raw: true,
  //   returning: ['title'],
  // });

})();
