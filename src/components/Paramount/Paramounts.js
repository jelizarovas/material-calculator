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
import { SearchOutlined } from "@material-ui/icons";

const ParamountLink = ({ paramountId, fullName, phone, email }) => {
  // let { url } = useRouteMatch();
  return (
    <tr className="hover:bg-pink-500 hover:text-white cursor-pointer">
      <td>
        <Link to={`/p/${paramountId}`}> {paramountId}</Link>
      </td>
      <td>
        <Link to={`/p/${paramountId}`}>{fullName}</Link>
      </td>
      <td>
        <Link to={`/p/${paramountId}`}>{email}</Link>
      </td>
      <td>
        <Link to={`/p/${paramountId}`}>{phone}</Link>
      </td>
      <td>
        <Link to={`/p1/${paramountId}`}>Single View</Link>
      </td>
    </tr>
  );
};

export const Paramounts = () => {
  const [state, setstate] = useState([]);
  const [filter, setFilter] = useState("");
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
    <div className="flex flex-col justify-center items-center bg-gray-50 container mx-auto">
      <Search value={filter} setValue={setFilter} />
      <div className="flex justify-center ">
        {/* <h1>Paramounts</h1> */}
        <table className="w-full">
          <thead className="text-white bg-gray-900 text-center cursor-pointer">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(filter.length === 0
              ? state
              : state.filter((v) => Object.values(v).toString().toLowerCase().includes(filter.toLowerCase()))
            ).map((a) => (
              <ParamountLink key={a.id} paramountId={a.id} fullName={a.fullName} email={a.email} phone={a.phone} />
            ))}
          </tbody>
        </table>
      </div>
      <button>+ Paramount</button>
    </div>
  );
};

const Search = ({ value = "", setValue }) => {
  const onChange = (e) => setValue(e.target.value);
  return (
    <div className="bg-white w-80 p-2 m-1 mx-4 rounded-md flex">
      <span>
        <SearchOutlined />
      </span>
      <input type="search" onChange={onChange} value={value} className="w-full pl-2" placeholder="search..." />
    </div>
  );
};
