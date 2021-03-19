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

export const defaultMiscFees = [
  {
    id: "IRmJsc",
    name: "Piano",
    defaultAmount: "125",
    Icon: Straighten,
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
