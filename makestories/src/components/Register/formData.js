import * as Yup from "yup";
const yupRequired = (text) => {
  return Yup.string().required(`${text} is required`);
};
const yupRequiredNumber = (text) => {
  return Yup.number().required(`${text} is required`);
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/; // for Mobile Numbers

export const updateValidations = Yup.object().shape({
  password: yupRequired("Password")
    .min(8, "Password must be at least 8 characters long!")
    .max(50, "Too Long!"),
});
export const creatNewValidations = Yup.object().shape({
  firstName: yupRequired("First Name")
    .min(2, "First Name must be at least 2 characters long!")
    .max(50, "Too Long!"),
  lastName: yupRequired("Last Name")
    .min(2, "Last Name must be at least 2 characters long!")
    .max(50, "Too Long!"),
  age: yupRequiredNumber("Age")
    .typeError("Age must be a number")
    .test("", "Enter age above 17", function (value) {
      return value > 17;
    }),
  email: yupRequired("Email").email("Invalid email"),
  phoneNumber: yupRequired("Contact number")
    .length(10, "Please enter a valid contact number.")
    .matches(phoneRegExp, "Please enter a valid contact number."),
  address: yupRequired("Address")
    .min(2, "Address must be at least 2 characters long!")
    .max(50, "Too Long!"),
  // photoURL: yupRequired("Photo URL"),
});

export const userInputList = [
  { md: 6, name: "firstName", labelText: "First Name *" },
  { md: 6, name: "lastName", labelText: "Last Name *" },
  { md: 6, name: "email", labelText: "Email *" },
  { md: 6, name: "password", labelText: "Password *" },
  { md: 6, name: "age", labelText: "Age *" },
  { md: 6, name: "phoneNumber", labelText: "Phone Number *" },
  { md: 6, name: "address", labelText: "Address *" },
];
export const userInputListUpdate = [
  { md: 6, name: "firstName", labelText: "First Name *" },
  { md: 6, name: "lastName", labelText: "Last Name *" },
  { md: 6, name: "email", labelText: "Email *" },
  { md: 6, name: "password", labelText: "Password " },
  { md: 6, name: "age", labelText: "Age *" },
  { md: 6, name: "phoneNumber", labelText: "Phone Number *" },
  { md: 6, name: "address", labelText: "Address *" },
];

export const getFinalDataForUpdate = (values, userToUpdate) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    age,
    address,
    photoURL,
  } = userToUpdate;

  let finalValues = {};
  if (values.firstName !== firstName) {
    finalValues.firstName = values.firstName;
  }
  if (values.lastName !== lastName) {
    finalValues.lastName = values.lastName;
  }
  if (values.password) {
    finalValues.password = values.password;
  }

  if (values.email !== email) {
    finalValues.email = values.email;
  }
  if (values.phoneNumber !== phoneNumber) {
    finalValues.phoneNumber = values.phoneNumbe;
  }

  if (values.age !== age) {
    finalValues.age = values.age;
  }
  if (values.address !== address) {
    finalValues.address = values.address;
  }
  if (values.photoURL || photoURL) {
    if (!photoURL) {
      finalValues.photoURL = values.photoURL;
    } else {
      if (
        photoURL.name !== values.photoURL.name &&
        photoURL.type !== values.photoURL.type &&
        photoURL.lastModified !== values.photoURL.lastModified
      ) {
        finalValues.photoURL = values.photoURL;
      }
    }
  }
  return finalValues;
};
