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
        const uploadTask = fStore.ref(`/images/${photoURL.name}`).put(photoURL);

        uploadTask.on(
          "state_changed",
          (snapShot) => {
            console.log(snapShot);
          },
          (err) => {
            console.log(err);
          },
          () => {
            fStore
              .ref("images")
              .child(photoURL.name)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                console.log("in fireBaseUrl", fireBaseUrl);
                db.ref("/users/" + user.uid).set({
                  phoneNumber,
                  photoURL: fireBaseUrl,
                  firstName,
                  lastName,
                  address,
                  age,
                });
                finalImageUrl = fireBaseUrl;
                return finalImageUrl;
              })
              .then(function () {
                console.log("oin upload finalImageUrl", finalImageUrl);
                return {
                  user,
                  finalImageUrl,
                };
              });
          }
        );
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
      return user;
    });
  // .catch(function (error) {
  //   return error; Handling data using saga ...
  //   console.log("error", error);
  // });
}

export function signin(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export async function updateDetails(userInfo) {
  const user = auth.currentUser;
  console.log("auth ", user.uid, userInfo);

  await db
    .ref("/users/" + user.uid)
    .update(userInfo)
    .then(() => {
      console.log("update complete");
    });
}

export const doSignOut = () => auth.signOut();

export const doPasswordUpdate = (password) => {
  auth.currentUser.updatePassword(password);
  console.log("pass update complte");
};
