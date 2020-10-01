import React, { useState } from "react";
import CountButton from "./components/CountButton";

function App() {
  const initialMaterials = [
    {
      name: "Small Box",
      volume: 1.5,
      w: "16 3/8",
      d: "12 5/8",
      h: "12 5/8",
      count: 0,
      img: "img/small.jpg",
      history: {},
    },
    {
      name: "Medium Box",
      volume: 3.0,
      w: "18",
      d: "18",
      h: "16",
      count: 0,
      img: "img/medium.jpg",
      history: {},
    },
    {
      name: "Large Box",
      volume: 4.5,
      w: "18",
      d: "18",
      h: "24",
      count: 0,
      img: "img/large.jpg",
      history: {},
    },
    {
      name: "Mattress Bag",
      description: "For use on mattresses & box springs",
      count: 0,
      img: "img/matbags.jpg",
      history: {},
    },
    {
      name: "Wardrobe (Rent)",
      volume: 13,
      w: "24",
      d: "24",
      h: "40",

      count: 0,
      img: "img/wardrobe.jpg",
      history: {},
    },
    {
      name: "Wardrobe (Buy)",
      volume: 13,
      w: "24",
      d: "24",
      h: "40",

      count: 0,
      img: "img/wardrobe.jpg",
      history: {},
    },
    {
      name: "Laydown Wardrobe",
      volume: 13,
      w: "24",
      d: "24",
      h: "40",

      count: 0,
      img: "img/laydown.jpg",
      history: {},
    },
    {
      name: "Mirror Pack (Small)",
      volume: 13,
      w: "24",
      d: "24",
      h: "40",

      count: 0,
      img: "img/smirror.jpg",
      history: {},
    },
    {
      name: "Mirror Pack (Large)",
      volume: 13,
      w: "24",
      d: "24",
      h: "40",

      count: 0,
      img: "img/lmirror.jpg",
      history: {},
    },
    {
      name: "Paper Pads",
      count: 0,
      img: "img/pads.jpg",
      history: {},
    },
    {
      name: "Stretch Wrap",
      count: 0,
      img: "img/wrap.jpg",
      history: {},
    },
    {
      name: "Carpet Protection",
      count: 0,
      img: "img/carpet.jpg",
      history: {},
    },
    {
      name: "Ropes",
      count: 0,
      img: "img/rope.jpg",
      history: {},
    },
    {
      name: "Blankets",
      count: 0,
      img: "img/blanket.jpg",
      history: {},
    },
  ];

  const [materials, setMaterials] = useState(initialMaterials);

  const Material = ({ m }) => {
    const { name, volume, count, img, w, d, h, description, subtext } = m;

    const [tooltip, setTooltip] = useState(false);

    const onClick = () => {
      setTooltip((t) => !t);
    };
    return (
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap ">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img className="h-10 w-10 " src={img} alt="" />
            </div>
            <div className="ml-4">
              <div className="text-sm leading-5 font-medium text-gray-900">
                {name}{" "}
                <div className={tooltip ? "mx-2 z-50 absolute " : "hidden"}>
                  <div className="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full   ">
                    {w && d && h ? `W: ${w}", D: ${d}", H: ${h}" ` : description}
                  </div>{" "}
                </div>
                <svg
                  className="fill-current w-4 h-4 inline text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={onClick}
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-sm leading-5 text-gray-500">
                <span>{volume ? `${volume} c.u. ft.` : subtext} </span>
              </div>
            </div>
          </div>
        </td>

        <td className="px-0 py-0 whitespace-no-wrap text-sm leading-5 text-gray-500">
          <CountButton count={count} />
        </td>
      </tr>
    );
  };

  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg mx-auto mt-2">
      <div className="px-6 py-4 ">
        <div className="font-bold text-orange-500 text-xl mb-0 text-center">Material Calculator</div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Count
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {materials.map((m) => (
                    <Material m={m} key={m.name + m.volume} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
