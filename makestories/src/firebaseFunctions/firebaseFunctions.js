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
  let finalImageUrl = null;
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      user = auth.currentUser;
      console.log("current user", user);
    })
    .then(() => {
      if (photoURL) {
        db.ref("/users/" + user.uid).set({
          phoneNumber,
          photoURL,
          firstName,
          lastName,
          address,
          age,
        });
      } else {
        db.ref("/users/" + user.uid).set({
          phoneNumber,
          photoURL: null,
          firstName,
          lastName,
          address,
          age,
        });
      }
    })
    .then(function () {
      console.log("final", user, userInfo);
      return user;
    });
}

export function signin(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export async function updateDetails(userInfo) {
  const user = auth.currentUser;
  console.log("auth ", user.uid, userInfo);
  console.log("inside update data fun ", userInfo);
  await db
    .ref("/users/" + user.uid)
    .update(userInfo)
    .then(() => {
      console.log("update complete");
    });
}

export const doSignOut = () => {
  auth.signOut();
};

export const doPasswordUpdate = (password) => {
  auth.currentUser.updatePassword(password);
  console.log("pass update complte");
};

export const doEmailUpdate = (email) => {
  auth.currentUser.updateEmail(email);
  console.log("email update complte");
};
