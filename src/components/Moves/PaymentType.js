export const PaymentType = ({ onChange, value }) => {
  const paymentOptions = [
    { label: "Cash ", value: "cash", adjustmentRate: "-5%" },
    { label: "Check", value: "check", adjustmentRate: "0" },
    { label: "Card ", value: "card", adjustmentRate: "3%" },
    { label: "Billed Later ", value: "billLater" },
  ];

  return (
    <select
      name="paymentOption"
      value={value}
      onChange={onChange}
      className="m-2 w-full  py-2 pr-6 text-sm text-black bg-white rounded-md pl-2 focus:outline-none focus:bg-white focus:text-gray-900"
    >
      {paymentOptions.map((p) => (
        <option key={p.label} value={p.value}>
          {p.label.toString()}
        </option>
      ))}
      <option onSelect={() => console.log("more")}>More...</option>
    </select>
  );
};
