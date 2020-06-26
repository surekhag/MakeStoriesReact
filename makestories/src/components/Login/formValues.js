import * as Yup from "yup";
export const initialValues = {
  email: "",
  password: "",
};

export const userInputList = [
  { md: 12, name: "email", labelText: "Email *" },
  { md: 12, name: "password", labelText: "Password *" },
];

const yupRequired = (text) => {
  return Yup.string().required(`${text} is required`);
};

export const dataValidation = Yup.object().shape({
  password: yupRequired("Password")
    .min(8, "Password must be at least 8 characters long!")
    .max(50, "Too Long!"),

  email: yupRequired("Email").email("Invalid email"),
});
