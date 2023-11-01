import * as Yup from "yup";

export const PAGINATION_SCHEMA = Yup.object().shape({
  limit: Yup.number().min(1).max(100).required(),
  offset: Yup.number().positive("Offset must by positive").required(),
});

const TITLE_NAME_SCHEMA = Yup.string()
  .trim()
  .min(2)
  .max(50)
  .matches(/^[A-Z](\w+\s){1,50}\w+$/);

const SOME_ID_SCHEMA = Yup.number()
  .integer("This field must be integer")
  .positive("This field must be positive");

export const NEW_BOOK_VALIDATION_SCHEMA = Yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  genre_id: SOME_ID_SCHEMA,
  shelf_id: SOME_ID_SCHEMA,
});

export const PATCH_BOOK_VALIDATION_SCHEMA = Yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  genre_id: SOME_ID_SCHEMA,
  shelf_id: SOME_ID_SCHEMA,
});
