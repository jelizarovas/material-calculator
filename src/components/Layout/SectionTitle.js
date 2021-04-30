import { memo } from "react";

export const SectionTitle = memo(
  ({ title, plus = true, hidePlus = false, Icon = undefined, Icon2 = undefined, onClick, onClick2 }) => {
    return (
      <div className="flex justify-between rounded-t-lg text-purple-600 border-b  mt-2 mb-2 bg-gray-200 border-purple-500">
        <h2 className="text-lg  px-4 py-2   font-medium "> {title}</h2>
        {!hidePlus && (
          <div className="text-gray-600 cursor-pointer select-none font-thin flex items-center ">
            {onClick2 && Icon2 && (
              <span onClick={onClick2} className="hover:text-purple-500  px-3 rounded-lg  ">
                {Icon2 ? <Icon2 className="p-1" /> : plus ? "+" : "×"}
              </span>
            )}
            <span onClick={onClick} className="  hover:text-purple-500  px-3 rounded-lg   ">
              {Icon ? <Icon className="p-1" /> : plus ? "+" : "×"}
            </span>
          </div>
        )}
      </div>
    );
  }
);
