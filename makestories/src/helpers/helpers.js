import * as Yup from "yup";

export const yupRequired = (text) => {
  return Yup.string().required(`${text} is required`);
};
export const yupRequiredNumber = (text) => {
  return Yup.number().required(`${text} is required`);
};
