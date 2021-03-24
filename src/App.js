import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Moves } from "./components/Moves/Moves";
import { Move } from "./components/Moves/Move";

import { Estimates } from "./components/Estimates/Estimates";
import { Estimate } from "./components/Estimates/Estimate";

import { Paramounts } from "./components/Paramount/Paramounts";
import { Paramount } from "./components/Paramount/Paramount";

import { Dispatch } from "./components/Dispatch/Dispatch";
import { Job } from "./components/Dispatch/Job";

import { Warehouse } from "./components/Warehouse/Warehouse";
import { Ware } from "./components/Warehouse/Ware";

import { Tools } from "./components/Tools/Tools";
import { Tool } from "./components/Tools/Tool";

import { Appbar } from "./components/Layout/Appbar";

// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyB1WHQPb434r37qVAQYoC53f5_cyaxMWmg",
//   authDomain: "sfm-tools-448ab.firebaseapp.com",
//   projectId: "sfm-tools-448ab",
//   storageBucket: "sfm-tools-448ab.appspot.com",
//   messagingSenderId: "980029527425",
//   appId: "1:980029527425:web:52b20aa5a85cca58b20480",
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp({});
// } else {
//   firebase.app(); // if already initialized, use that one
// }

// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const firestore = firebase.firestore();

function App() {
  // const [user] = useAuthState(auth);

  return (
    <Router basename="/">
      <Appbar />
      {/* <div className="p-5 bg-white"> */}
      {/* {user ? (
          <div>
            yes user <SignOut />
          </div>
        ) : (
          <SignIn />
        )} */}
      {/* </div> */}
      <div className="container relative mx-auto bg-gray-100 rounded-b-lg shadow-2xl   md:p-2">
        <Switch>
          <Redirect exact from="/" to="/m/R2tpMl/client" />
          <Redirect exact from="/materials" to="/t/materials" />
          <Redirect exact from="/bol" to="/t/coordinates" />
          <Redirect exact from="/bingo" to="/t/loadchart" />

          <Route path="/moves" component={Moves} />
          <Route path="/m/:moveId" component={Move} />

          <Route path="/estimates" component={Estimates} />
          <Route path="/e/:estimateId" component={Estimate} />

          <Route path="/paramount" component={Paramounts} />
          <Route path="/p/:pId" component={Paramount} />

          <Route path="/dispatch" component={Dispatch} />
          <Route path="/d/:jobId" component={Job} />

          <Route path="/warehouse" component={Warehouse} />
          <Route path="/w/:wId" component={Ware} />

          <Route path="/tools" component={Tools} />
          <Route path="/t/:toolId" component={Tool} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;

// function SignIn() {
//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider);
//   };

//   return (
//     <>
//       <button className="sign-in" onClick={signInWithGoogle}>
//         Sign in with Google
//       </button>
//       <p>Do not violate the community guidelines or you will be banned for life!</p>
//     </>
//   );
// }

// function SignOut() {
//   return (
//     auth.currentUser && (
//       <button className="sign-out" onClick={() => auth.signOut()}>
//         Sign Out
//       </button>
//     )
//   );
// }
