// firebase.js
// contains the Firebase context and provider

// import React, { createContext, useEffect } from "react";
// import app from "firebase/app";
// import "firebase/database";
// import { useDispatch } from "react-redux";

// import { addWare, toggleWare } from "../redux/actions";

// // we create a React Context, for this to be accessible
// // from a component later
// const FirebaseContext = createContext(null);
// export { FirebaseContext };

// export default ({ children }) => {
//   let firebase = {
//     app: null,
//     database: null,
//   };

//   const dispatch = useDispatch();

//   // check if firebase app has been initialized previously
//   // if not, initialize with the config we saved earlier
//   if (!app.apps.length) {
//     app.initializeApp(firebaseConfig);
//     firebase = {
//       app: app,
//       database: app.database(),

//       api: {
//         getWare,
//       },
//     };
//   }

//   // function to query Ware from the database and
//   // fire a Redux action to update the items in real-time
//   function getWare() {
//     firebase.database.ref("ware").on("value", (snapshot) => {
//       const vals = snapshot.val();
//       let _records = [];
//       for (var key in vals) {
//         _records.push({
//           ...vals[key],
//           id: key,
//         });
//       }
//       // setWare is a Redux action that would update the todo store
//       // to the _records payload
//       // dispatch(setWare(_records));
//     });
//   }

//   return <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>;
// };
