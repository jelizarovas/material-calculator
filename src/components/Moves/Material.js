import { Delete } from "@material-ui/icons";
import React /*, { useState }*/ from "react";
import CountButton from "../Inputs/CountButton";

export const Material = (props) => {
  const {
    handleChange,
    handleRemove,
    id,
    name,
    volume,
    img,
    rate,
    units,
    total,
    isCustom,
    subtext,
    /*w, d, h, description,*/
  } = props;

  const changeCount = (units) => {
    handleChange(id, { units, total: Number(units) * Number(rate) });
  };

  const changeRate = (e) => {
    handleChange(id, { rate: e.target.value, total: Number(units) * Number(e.target.value) });
  };
  const changeInput = (e) => {
    handleChange(id, { [e.target.name]: e.target.value });
  };

  return (
    <tr className="hover:bg-purple-200 focus:outline-none focus:ring-2">
      <td>
        <div className="flex items-center  align-middle">
          <div className="p-1">
            {isCustom ? (
              <Delete onClick={() => handleRemove(id)} className="p-1 hover:text-red-400 cursor-pointer" />
            ) : (
              <img className="max-h-5 w-5" src={process.env.PUBLIC_URL + "/" + img} alt="" />
            )}
          </div>
          <div className="flex-col">
            {!isCustom ? (
              <>
                <div className="flex-1 text-sm">{name} </div>
                <div className="text-xs align-middle">
                  <span>{volume ? `${volume} c.u. ft.` : subtext} </span>
                </div>
              </>
            ) : (
              <input
                name="name"
                value={name}
                onChange={changeInput}
                onFocus={(e) => e.target.select()}
                onKeyPress={(e) => {
                  if (e.key === "Enter") e.target.blur();
                }}
                className="`  p-1 bg-transparent  text-xs border-b-2 focus:border-green-700 hover:border-green-700  cursor-pointer             "
              />
            )}
          </div>
        </div>
      </td>

      <td>
        <CountButton count={units} changeCount={changeCount} />
      </td>
      <td
        className="text-right text-xs px-3"
        // onClick={toggleShowChangeRate}
        // onBlur={() => setShowChangeRate(false)}
      >
        <span className={units > 0 ? "text-gray-800" : "text-gray-400"}>{units > 0 ? "× " : "$"}</span>
        <input
          className={`p-1 w-9 bg-transparent  text-xs text-center  border-b focus:border-green-700 hover:border-green-700  cursor-pointer`}
          name="rate"
          value={rate}
          type="number"
          // ref={ref}
          onChange={changeRate}
          onFocus={(e) => e.target.select()}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.target.blur();
            }
          }}
        />
        <span className={units > 0 ? "text-gray-800" : "text-gray-400"}>{units > 0 ? ` = $ ${total}` : "/ unit"}</span>
        {/* <span
          className={`${showChangeRate ? "hidden" : ""}`}
          onClick={() => {
            setShowChangeRate(true);
            ref.current && ref.current.focus();
          }}
        >
          {units > 0 ? ` × $ ${rate} = $ ${total}` : `$ ${rate} / unit`}
        </span> */}
      </td>
    </tr>
  );
};

// const RateInput = (props) => {
//   const ref = React.useRef();
//   React.useEffect(() => {
//     ref.current && ref.current.focus();
//   }, []);

//   return <input {...props} ref={ref} />;
// };

// console.log(material);

// const [tooltip, setTooltip] = useState(false);

// const onClick = () => {
//   setTooltip((t) => !t);
// };

// const SvgInfo = () => {
//   return (
//     <svg
//       className="fill-current w-4 h-4 inline text-gray-500"
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 20 20"
//       fill="currentColor"
//       onClick={onClick}
//     >
//       <path
//         fillRule="evenodd"
//         d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// };

/* <div className={tooltip ? "" : "hidden"}>
                <div>
                {w && d && h ? `W: ${w}", D: ${d}", H: ${h}" ` : description}
                </div>{" "}
              </div> */

/*  */
