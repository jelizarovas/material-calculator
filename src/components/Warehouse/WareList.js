import React from "react";
import { connect } from "react-redux";
import Ware from "./Ware";
// import { getWares } from "../redux/selectors";
import { getWaresByVisibilityFilter } from "../../redux/selectors";
// import { VISIBILITY_FILTERS } from "../../constants";

const WareList = ({ wares }) => (
  <ul className="ware-list">
    {wares && wares.length
      ? wares.map((ware, index) => {
          return <Ware key={`ware-${ware.id}`} ware={ware} />;
        })
      : "No wares, yay!"}
  </ul>
);

// const mapStateToProps = state => {
//   const { byIds, allIds } = state.wares || {};
//   const wares =
//     allIds && state.wares.allIds.length
//       ? allIds.map(id => (byIds ? { ...byIds[id], id } : null))
//       : null;
//   return { wares };
// };

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  const wares = getWaresByVisibilityFilter(state, visibilityFilter);
  return { wares };
  //   const allWares = getWares(state);
  //   return {
  //     wares:
  //       visibilityFilter === VISIBILITY_FILTERS.ALL
  //         ? allWares
  //         : visibilityFilter === VISIBILITY_FILTERS.COMPLETED
  //           ? allWares.filter(ware => ware.completed)
  //           : allWares.filter(ware => !ware.completed)
  //   };
};
// export default WareList;
export default connect(mapStateToProps)(WareList);
