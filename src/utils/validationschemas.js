import * as Yup from "yup";

export const PAGINATION_SCHEMA = Yup.object().shape({
  limit: Yup.number().min(1).max(100).required(),
  offset: Yup.number().positive("offset must by positive").required(),
});
