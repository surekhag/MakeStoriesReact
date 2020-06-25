import { auth, db, fStore, base } from "../services/Firebase/firebase";

export function signup(userInfo) {
  console.log("in sign up", userInfo);

  const {
    email,
    password,
    phoneNumber,
    photoURL,
    firstName,
    lastName,
    address,
    age,
  } = userInfo;
  // const imageUrl = photoURL;
  let user = null;
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      user = auth.currentUser;
      console.log("current user", user);
      // user.sendEmailVerification();
    })
    .then(() => {
      db.ref("/users/" + user.uid).set({
        phoneNumber,
        photoURL: photoURL ? photoURL.name : null,
        firstName,
        lastName,
        address,
        age,
      });
    })
    .then(() => {
      if (photoURL) {
        fStore.ref(`/images/${photoURL.name}`).put(photoURL);
      }
    })
    .then(function () {
      console.log("success");
      return user;
      // Update successful.
    });
  // .catch(function (error) {
  //   return error; Handling data using saga ...
  //   console.log("error", error);
  // });
}

export function signin(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}
