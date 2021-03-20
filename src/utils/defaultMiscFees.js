import {
  DeleteForever,
  DirectionsBoat,
  DirectionsRun,
  HotTub,
  LocalParking,
  Straighten,
  TwoWheeler,
  Weekend,
  Widgets,
} from "@material-ui/icons";

const Piano = ({ setValue } = {}) => {
  const value = "33";

  return (
    <div className="flex flex-col  justify-between items-center  rounded-md border-b bg-white m-1 p-2">
      <span>Piano Guide</span>
      <span className="text-xs text-gray-400">
        This guide should show how to set price when item was unexpected and management is unavailable
      </span>
      <div>
        <button
          className="text-xs bg-blue-800 rounded-md text-white p-2 m-2"
          onClick={() => setValue && setValue(value)}
        >
          Set value to $125
        </button>
      </div>
    </div>
  );
};

export const defaultMiscFees = [
  {
    id: "IRmJsc",
    name: "Piano",
    defaultAmount: "125",
    Icon: Straighten,
    Guide: Piano,
  },
  {
    id: "zz7cX7",
    name: "Removal (Dump/Donate)",
    defaultAmount: "50",
    pre: "starts at",
    Icon: DeleteForever,
  },
  {
    id: "KD83m2",
    name: "Hoist",
    defaultAmount: "350",
    Icon: Weekend,
  },
  {
    id: "RtoY57",
    name: "Tolls/Ferry",
    defaultAmount: "185",
    Icon: DirectionsBoat,
  },
  {
    id: "PobHV7",
    name: "Storage",
    defaultAmount: "100",
    Icon: Widgets,
  },
  {
    id: "odrUhV",
    name: "Storage Labor",
    defaultAmount: "2",
    Icon: DirectionsRun,
  },
  {
    id: "3qgVEX",
    name: "Bulky",
    defaultAmount: "1",
    Icon: TwoWheeler,
  },
  {
    id: "gs7eW8",
    name: "Hot tub",
    defaultAmount: "2",
    Icon: HotTub,
  },
  {
    id: "cZYuHW",
    name: "Permits",
    defaultAmount: "2",
    Icon: LocalParking,
  },
];
