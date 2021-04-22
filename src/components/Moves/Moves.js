import React from "react";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  useHistory,
  // useParams,
  // useRouteMatch,
} from "react-router-dom";
import { nanoid } from "nanoid";
// import faker from "faker";
import { AddCircle, Filter, Search } from "@material-ui/icons";

import { useSelector } from "react-redux";
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from "react-redux-firebase";
import { timestamp } from "../..";

const movesQuery = {
  collection: "moves",
  limitTo: 10,
};

const MoveLink = ({ id = "", firstName, lastName, fullName = "", phone = "", email = "" }) => {
  // let { url } = useRouteMatch();
  return (
    <div className="hover:bg-pink-500 hover:text-white cursor-pointer flex w-full justify-around">
      <div>
        <Link to={`/m/${id}`}> {id}</Link>
      </div>
      <div>
        <Link to={`/m/${id}`}>{fullName || (!!firstName && !!lastName) ? firstName + " " + lastName : ""}</Link>
      </div>
      <div>
        <Link to={`/m/${id}`}>{email}</Link>
      </div>
      <div>
        <Link to={`/m/${id}`}>{phone}</Link>
      </div>
      <div>
        <Link to={`/m1/${id}`}>Single View</Link>
      </div>
    </div>
  );
};

export const Moves = () => {
  // const [state, setstate] = useState([]);

  const firestore = useFirestore();
  let history = useHistory();
  const newMove = async () => {
    const id = nanoid(6);
    try {
      await firestore.collection("moves").doc(id).set({ createdAt: timestamp() });
    } catch (error) {
      console.log(error);
    }
    history.push({
      pathname: `/m/${id}`,
      // search: '?query=abc',
      // state: { detail: 'some_value' }
    });

    //push to m/new id
  };

  useFirestoreConnect(() => [movesQuery]);
  const moves = useSelector(({ firestore: { ordered } }) => ordered.moves);

  // Show a message while moves are loading
  if (!isLoaded(moves)) {
    return "Loading";
  }

  // Show a message if there are no moves
  if (isEmpty(moves)) {
    return "Todo list is empty";
  }

  // useEffect(() => {
  //   const arr = [];
  //   for (let i = 0; i < 20; i++) {
  //     arr[i] = {
  //       id: nanoid(6),
  //       fullName: faker.name.findName(),
  //       email: faker.internet.email(),
  //       phone: faker.phone.phoneNumber(),
  //     };
  //   }
  //   setstate(arr);
  // }, []);
  // let { path, url } = useRouteMatch();

  const search = () => {
    return console.log("search");
  };
  const filter = () => {
    return console.log("filter");
  };

  return (
    <div className="container bg-white mx-auto  min-h-full flex flex-col items-center pb-4 mb-4">
      <Toolbar newMove={newMove} filter={filter} search={search} />
      <div className="flex justify-between w-full">
        {/* <h1>Moves</h1> */}
        <div className="sidebar flex flex-col w-full">
          {moves.map(({ id, ...rest }, ind) => (
            <MoveLink key={`${id}-${ind}`} id={id} {...rest} />
          ))}
        </div>
        {/* <table className="">
          <thead className="text-white bg-gray-900 text-center cursor-pointer">
            <tr>
              <th>Ih</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.map((a) => (
              <MoveLink key={a.id} moveId={a.id} fullName={a.fullName} email={a.email} phone={a.phone} />
            ))}
          </tbody>
        </table> */}
      </div>
      {/* <button>+ Move</button> */}
    </div>
  );
};

const Toolbar = ({ newMove, filter, search }) => {
  return (
    <div className="w-full bg-gray-200 flex justify-between border border-gray-300 mb-2">
      <div className=" flex items-center">
        <span className="py-2 px-4 ">
          <span className="hover:underline px-2 cursor-pointer">... /</span>
          <span className="hover:underline  cursor-pointer">Moves /</span>
        </span>
      </div>
      <div className="rightToolbar flex">
        <button className=" text white p-2 rounded-md  flex items-center px-4 " onClick={search}>
          <span>
            <Search className="p-1" />
          </span>
          Search
        </button>
        <button className=" text white p-2 rounded-md  flex items-center px-4 " onClick={filter}>
          <span>
            <Filter className="p-1" />
          </span>
          Filter
        </button>
        <button className=" text white p-2 rounded-md  flex items-center px-4 " onClick={newMove}>
          <span>
            <AddCircle className="p-1" />
          </span>
          New Move
        </button>
      </div>
    </div>
  );
};

// const MoveItem = (props) => {
//   return <div>{props?.id}</div>;
// };
