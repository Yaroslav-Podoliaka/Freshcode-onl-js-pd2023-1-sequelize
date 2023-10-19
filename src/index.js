const db = require("./db/models");
// const { Op } = require('sequelize');

(async function () {
  const {Sequelize: { Op }} = db;
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

  // const national = await db.Nationality.create({
  //   title: 'Ukraine',
  // },
  // {
  //   raw: true,
  //   returning: ['id', 'title'],
  // });
  // console.log('National Is', national);

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
  //   {email: "ernest@gmail.com"},
  //  {where: {
  //   id: 1
  // }});
  // console.log(updatedAuthor);

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
  // console.log(genres);
  // await db.Order.sync({alter: true});
  // await db.Customer.sync({alter: true});
  // await db.Book.sync({alter: true});
  // await db.Author.sync({alter: true});
  // const [book1] = await db.Book.findAll({where: {
  //   id: 3
  // }});
  // const genreByBookId = await book1.getGenre();
  // console.log(genreByBookId);
})();
