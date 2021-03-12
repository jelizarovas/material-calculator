import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { nanoid } from "nanoid";

const MoveLink = ({ moveId }) => {
  let { url } = useRouteMatch();
  return (
    <li className="p-1">
      <Link to={`/m/${moveId}`}>{moveId}</Link>
    </li>
  );
};

export const Moves = () => {
  const [state, setstate] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr[i] = nanoid(6);
    }
    setstate(arr);
  }, []);
  let { path, url } = useRouteMatch();

  return (
    <div>
      List of Moves
      <ul>
        {state.map((a) => (
          <MoveLink moveId={a} />
        ))}
      </ul>
      <button>New Move</button>
    </div>
  );
};
