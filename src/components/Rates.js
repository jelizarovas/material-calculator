import React from "react";
import { Input } from "./Input";
import { LocalShipping, CalendarToday, AccessTime } from "@material-ui/icons/";

import { useClient, useClientDispatch } from "./Providers/ClientProvider";

const TravelTime = () => {
  const times = ["0:15", "0:30", "0:45", "1:00", "1:15", "1:30", "1:45", "2:00"];

  return (
    <select className="m-2 w-1/2  py-2 pr-6 text-sm text-black bg-white rounded-md pl-2 focus:outline-none focus:bg-white focus:text-gray-900">
      {times.map((t) => (
        <option key={t}>⏰ {t}</option>
      ))}
    </select>
  );
};

// const DropDown = () => {
//   return (
//     <div>
//       <label id="listbox-label" className="block text-sm font-medium text-gray-700">
//         Assigned to
//       </label>
//       <div className="mt-1 relative">
//         <button
//           type="button"
//           aria-haspopup="listbox"
//           aria-expanded="true"
//           aria-labelledby="listbox-label"
//           className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         >
//           <span className="flex items-center">
//             <img
//               src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//               alt=""
//               className="flex-shrink-0 h-6 w-6 rounded-full"
//             />
//             <span className="ml-3 block truncate">Tom Cook</span>
//           </span>
//           <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//             {/* Heroicon name: solid/selector */}
//             <svg
//               className="h-5 w-5 text-gray-400"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//               aria-hidden="true"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </span>
//         </button>
//         {/*
//       Select popover, show/hide based on select state.

//       Entering: ""
//         From: ""
//         To: ""
//       Leaving: "transition ease-in duration-100"
//         From: "opacity-100"
//         To: "opacity-0"
//     */}
//         <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
//           <ul
//             tabIndex={-1}
//             role="listbox"
//             aria-labelledby="listbox-label"
//             aria-activedescendant="listbox-item-3"
//             className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
//           >
//             {/*
//           Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

//           Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
//         */}
//             <li
//               id="listbox-item-0"
//               role="option"
//               className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
//             >
//               <div className="flex items-center">
//                 <img
//                   src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                   alt=""
//                   className="flex-shrink-0 h-6 w-6 rounded-full"
//                 />
//                 {/* Selected: "font-semibold", Not Selected: "font-normal" */}
//                 <span className="ml-3 block font-normal truncate">Wade Cooper</span>
//               </div>
//               {/*
//             Checkmark, only display for selected option.

//             Highlighted: "text-white", Not Highlighted: "text-indigo-600"
//           */}
//               <span className="absolute inset-y-0 right-0 flex items-center pr-4">
//                 {/* Heroicon name: solid/check */}
//                 <svg
//                   className="h-5 w-5"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </span>
//             </li>
//             {/* More items... */}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

export const Rates = () => {
  const client = useClient();
  const dispatch = useClientDispatch();

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  const { date, hourlyRate, travelFee, totalHours, startTime, endTime } = client;

  return (
    <div className="md:container md:mx-auto">
      <div className="px-10 w-full sm:w-1/2 mx-auto lg:w-1/2 flex-row ">
        <form method="post">
          <h2>Job Type</h2>

          <select className="m-2 w-full  py-2 pr-6 text-sm text-black bg-white rounded-md pl-2 focus:outline-none focus:bg-white focus:text-gray-900">
            <option>⏰ Local (Hourly)</option>
            <option>🚚 Long Distance</option>
            <option>💳 Flat Rate</option>
          </select>

          <h2>Date</h2>
          {/* <DropDown /> */}
          <Input name="date" value={date} onChange={onChange} Icon={CalendarToday} placeholder="Date" type="text" />

          <h2>Rates</h2>

          <Input
            name="hourlyRate"
            value={hourlyRate}
            onChange={onChange}
            placeholder="Hourly"
            type="number"
            Icon={() => <span className="select-none text-bold">$/hr</span>}
            step="5"
          />
          <div className="flex">
            <Input
              name="travelFee"
              value={travelFee}
              onChange={onChange}
              placeholder="Travel Fee"
              type="number"
              Icon={LocalShipping}
            />
            <TravelTime />
          </div>

          <h2>Time</h2>

          <div className="flex">
            <Input name="startTime" value={startTime} onChange={onChange} placeholder="Start" Icon={AccessTime} />
            <Input name="endTime" value={endTime} onChange={onChange} placeholder="End" Icon={AccessTime} />
          </div>
          <h2>Totals</h2>
          <Input name="totalHours" value={totalHours} onChange={onChange} placeholder="Total Hours" Icon={AccessTime} />

          <h2 className="text-4xl mt-10">
            Total sum is $ {Number(totalHours) * Number(hourlyRate) + Number(travelFee)}
          </h2>
        </form>
      </div>
    </div>
  );
};
