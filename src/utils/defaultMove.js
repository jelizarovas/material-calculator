function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
}

export const defaultMove = {
  fullName: "Christopher Hammer",
  phoneNumber: "4173433327",
  email: "ch8978hammerindustries@hotmail.com",
  originAddress: "21 Main St Apt 101 Seattle, WA 98121",
  destinationAddress: "222 216th Ave NW Seattle, WA 98117",
  anyAdditionalStops: false,
  additionalStops: "Wingstop",
  notes:
    "Large 1 Bedroom condo/aprt. (Total 750 c.f. / 5250 lbs) (with Living room, Office and Dining room). 2 Movers, 1 Trucks",

  estimateIsBinding: false,
  valuation: "basic",

  valuationRate: 1.4,
  valuationCost: "367.50",
  valuationRateWithDeductible: 1.15,
  valuationCostWithDeductible: "301.88",
  shipmentValue: "26250",

  totalValuation: "0",

  personnel: ["Arnas", "Noel", "Logan"],

  jobType: "local", // || "longDistance" || flatRate
  flatAmount: "",
  flatIsMaterialsIncluded: false,

  dates: [getFormattedDate(new Date()), getFormattedDate(new Date())],
  hourlyRate: "135",
  isTravelFeeFixed: true,
  travelTime: "1.25",
  travelFee: "168.75",
  paymentOption: "cash",
  startTime: "8:00",
  arriveTime: "8:30",
  departTime: "13:00",
  endTime: "13:30",
  breakTime: "0:30",
  totalHours: "4:00",

  distance: "125",
  grossWeight: "26000",
  tareWeight: "16000",
  netWeight: "10000",
  mileageRate: "0.55",

  estimatedWeight: "5250",

  totalTransportation: "708.75",

  materials: [],
  totalMaterials: "5",
  miscFees: [],
  totalOtherFees: "0",

  subtotal: "713.75",
  adjustment: "21.41",
  totalMovingCharges: "735.16",
  totalAmountPaid: "882.19",
  remainingBalance: "147.03",

  signature:
    "data:image/png;base64,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",
  initials:
    "data:image/png;base64,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",
  crewSignature:
    "data:image/png;base64,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",

  agreedToEstimate: true,
  estimateAgreedDate: getFormattedDate(new Date()),
  crewLeadAssigned: true,
  jobComplete: true,
};
