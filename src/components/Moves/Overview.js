import { fillBOLForm } from "../../utils/fillBOLForm";
import { useMove } from "../Providers/MoveProvider";

export const Overview = () => {
  const client = useMove();

  return (
    <div className="w-full">
      <br></br>
      <button className="bg-gray-700 p-2 m-2 text-white" onClick={() => fillBOLForm(client)}>
        Get bill of lading
      </button>

      {/* <PreviewPDF client={client} /> */}
    </div>
  );
};
