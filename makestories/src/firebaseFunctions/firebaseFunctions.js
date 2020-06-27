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
  await db
    .ref("/users/" + user.uid)
    .update(userInfo)
    .then(() => {
      // console.log("update complete");
    });
}

export const doSignOut = () => {
  auth.signOut();
};

export const doPasswordUpdate = (password) => {
  auth.currentUser.updatePassword(password);
};

export const doEmailUpdate = (email) => {
  auth.currentUser.updateEmail(email);
};

export const getUserDataFromDb = (setCurrentUser, currentUserData) => {
  const user = auth.currentUser;
  const userRef = db.ref("/users/" + user.uid);
  userRef.on("value", (snapshot) => {
    const data = snapshot.val();
    setCurrentUser({ ...data, ...currentUserData });
  });
};

export async function submitDataWithImage(
  image,
  dispatch,
  updateUser,
  setUpdatedImage,
  addNewUser,
  userToUpdate
) {
  const uploadTask = fStore
    .ref(`/images/${image.photoURL.name}`)
    .put(image.photoURL);
  await uploadTask.on(
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
        .child(image.photoURL.name)
        .getDownloadURL()
        .then((fireBaseUrl) => {
          image.photoURL = fireBaseUrl;
          if (userToUpdate) {
            dispatch(updateUser(image));
            setUpdatedImage(fireBaseUrl);
          } else {
            dispatch(addNewUser(image));
          }
        });
    }
  );
}
