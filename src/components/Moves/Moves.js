import React, { useState, useEffect } from "react";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // useParams,
  // useRouteMatch,
} from "react-router-dom";
import { nanoid } from "nanoid";
import faker from "faker";

const MoveLink = ({ moveId, fullName, phone, email }) => {
  // let { url } = useRouteMatch();
  return (
    <tr className="hover:bg-pink-500 hover:text-white cursor-pointer">
      <td>
        <Link to={`/m/${moveId}`}> {moveId}</Link>
      </td>
      <td>
        <Link to={`/m/${moveId}`}>{fullName}</Link>
      </td>
      <td>
        <Link to={`/m/${moveId}`}>{email}</Link>
      </td>
      <td>
        <Link to={`/m/${moveId}`}>{phone}</Link>
      </td>
    </tr>
  );
};

export const Moves = () => {
  const [state, setstate] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr[i] = {
        id: nanoid(6),
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
      };
    }
    setstate(arr);
  }, []);
  // let { path, url } = useRouteMatch();

  return (
    <div className="flex justify-center">
      {/* <h1>Moves</h1> */}
      <table>
        <thead className="text-white bg-gray-900 text-center cursor-pointer">
          <tr>
            <th>Ih</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {state.map((a) => (
            <MoveLink key={a.id} moveId={a.id} fullName={a.fullName} email={a.email} phone={a.phone} />
          ))}
        </tbody>
      </table>
      {/* <button>+ Move</button> */}
    </div>
  );
};
