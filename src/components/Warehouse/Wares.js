import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { toggleWare } from "../redux/actions";

const Wares = ({ ware, toggleWare }) => (
  <li className="ware-item" onClick={() => toggleWare(ware.id)}>
    {ware && ware.completed ? "👌" : "👋"}{" "}
    <span className={cx("ware-item__text", ware && ware.completed && "ware-item__text--completed")}>
      {ware.content}
    </span>
  </li>
);

// export default Ware;
export default connect(null, { toggleWare })(Wares);
