import React, { useState, useRef, useCallback } from "react";
import { FieldsList } from "./FieldsList";
import { PacketList } from "./PacketList";
import { PreviewPDF } from "./PreviewPDF";
import { DndProvider } from "react-dnd";
import { nanoid } from "nanoid";
// import { HTML5Backend } from "react-dnd-html5-backend";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import { useDrop, useDrag } from "react-dnd";
import update from "immutability-helper";
import { Clear } from "@material-ui/icons";
import { NavLink, useRouteMatch } from "react-router-dom";
import { fillPDF } from "../../utils/fillPDF";

const styles = {
  width: "612px",
  height: "792px",
};

// const fieldExample = {
//   id: "234dss",
//   place: [
//     {
//       pdfId: "asdvxzcvzxcv",
//       pageNum: 1,
//       x: 0,
//       y: 0,
//     },
//   ],
//   name: "Full Name",
//   value: "Arnas Jelizarovas",
// };

// const urls = ({ path, url }) => ({
//   current: path,
//   redirect: `${url}/client`,

//   ...Object.fromEntries(
//     ["type", "contact", "prepdocs", "schedule", "assign", "overview"].map((u) => [u, `${path}/${u}`])
//   ),
// });

export const Paramount = () => {
  const [pdf, setPdf] = useState(null);
  // const [fields, setFields] = useState([fieldExample]);
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 80, title: "Drag me around" },
    b: { top: 180, left: 20, title: "Drag me too" },
  });
  // const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  // const getCoordinates = (e) => {
  //   console.log("getcoordinates");
  //   var rect = e.target.getBoundingClientRect();
  //   var x = e.clientX - rect.left; //x position within the element.
  //   var y = e.clientY - rect.top; //y position within the element.
  //   setCoordinates({ x: x.toFixed(2), y: -(y - 792).toFixed(2) });
  //   // console.log("Left? : " + x + " ; Top? : " + -(y - 792) + ".");
  // };

  const pdfize = async (e) => {
    if (!!pdf) {
      const newPdf = await fillPDF({ url: pdf?.url });
      setPdf((file) => ({ ...file, data: newPdf }));
    }
  };

  return (
    <div className="flex  justify-around items-start ">
      <TaskList />
      <div>
        <PacketList pdf={pdf} setPdf={setPdf} />
        <button onClick={pdfize} className="bg-purple-700 text-white p-2 rounded-md">
          PDFize
        </button>
        <button
          onClick={() => {
            console.log(pdf);
          }}
          className="bg-purple-700 text-white p-2 rounded-md"
        >
          clg
        </button>
      </div>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <FieldsList />
        {/* <div className="flex">{`x: ${coordinates.x}, y: ${coordinates.y}`}</div> */}
        {/* <Dropzone style={styles} className="bg-red-500" allowedDropEffect="move" onClick={getCoordinates}>
          DROPZONE */}
        {/* </Dropzone> */}
        {/* <GlobalBox /> */}
        <LocalBox pdf={pdf} boxes={boxes} setBoxes={setBoxes} />
      </DndProvider>
      {/* <PreviewPDF /> */}
    </div>
  );
};

// const style = {
//   minWidth: "612px",
//   minHeight: "792px",
// };

// function selectBackgroundColor(isActive, canDrop) {
//   if (isActive) {
//     return "darkgreen";
//   } else if (canDrop) {
//     return "darkkhaki";
//   } else {
//     return "#222";
//   }
// }
export const Dropzone = (props) => {
  // const ref = useLocalDrop(console.log);
  // const ref = useRef();
  // const { allowedDropEffect } = props;
  // const [{ canDrop, isOver }, drop] = useDrop(
  //   () => ({
  //     accept: "box",
  //     drop(item, monitor) {
  //       console.log("drop");
  //       const offset = monitor.getSourceClientOffset();
  //       if (offset && ref.current) {
  //         const dropTargetXy = ref.current.getBoundingClientRect();
  //         console.log("local", {
  //           x: offset.x - dropTargetXy.left,
  //           y: offset.y - dropTargetXy.top,
  //         });
  //       }
  //     },
  //     collect: (monitor) => ({
  //       isOver: monitor.isOver(),
  //       canDrop: monitor.canDrop(),
  //     }),
  //   }),
  //   [allowedDropEffect]
  // );
  // const isActive = canDrop && isOver;
  // const backgroundColor = selectBackgroundColor(isActive, canDrop);
  return <div {...props}>Dropzone</div>;
};

// function GlobalBox() {
//   const ref = useGlobalDrop(console.log);
//   return <div ref={ref} className="GlobalBox" />;
// }

function LocalBox({ pdf, boxes, setBoxes }) {
  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes, setBoxes]
  );

  const handleDelete = (id) => {
    return (e) => {
      setBoxes((boxes) => {
        console.log(boxes[id]);
        return boxes;
      });
    };
  };

  const ref = useLocalDrop(moveBox, setBoxes);
  return (
    <div ref={ref} className="LocalBox bg-purple-900 relative" style={styles}>
      <PreviewPDF pdf={pdf} />
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key];
        return (
          <Box key={key} id={key} left={left} top={top} hideSourceOnDrag={true} handleDelete={handleDelete}>
            {title}
          </Box>
        );
      })}
    </div>
  );
}

const Box = ({ id, left, top, hideSourceOnDrag = true, children, handleDelete }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "box",
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag}>t</div>;
  }

  return (
    <button
      ref={drag}
      className="absolute bg-green-500 text-white text-xs px-1 rounded-sm cursor-pointer"
      style={{ left, top }}
      // role="Box"
    >
      <span>
        {children} [{left.toFixed(1)}, {(792 - Number(top)).toFixed(1)}]
      </span>
      <span className="m-1 hover:text-gray-300" onClick={handleDelete(id)}>
        <Clear className="p-1" />
      </span>
    </button>
  );
};

function useLocalDrop(moveBox, setBoxes) {
  const ref = useRef();

  const [, dropTarget] = useDrop({
    accept: ["box", "field"],
    drop(item, monitor) {
      console.log();
      if (monitor.getItemType() === "field") {
        const offset = monitor.getSourceClientOffset();
        if (offset && ref.current) {
          const dropTargetXy = ref.current.getBoundingClientRect();
          const x = offset.x - dropTargetXy.left;
          const y = offset.y - dropTargetXy.top;

          setBoxes((b) => ({ ...b, [nanoid(6)]: { title: item.name, fieldId: item.id, left: x, top: y } }));
          return undefined;
        }
      }
      if (monitor.getItemType() === "box") {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
        return undefined;
      }
    },
  });

  return (elem) => {
    ref.current = elem;
    dropTarget(ref);
  };
}

// function useGlobalDrop(onDrop) {
//   const [, dropTarget] = useDrop({
//     accept: "box",
//     drop(item, monitor) {
//       const offset = monitor.getClientOffset();
//       if (offset) {
//         onDrop("global", offset);
//       }
//     },
//   });

//   return dropTarget;
// }

const TaskList = () => {
  // const [links] = useState(urls(useRouteMatch()));

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        <TaskLink to="type" text="Job Type" />

        <TaskLink to="contact" text="Personal Info" />

        <TaskLink to="prep" text="Prepare Paperwork" />

        <TaskLink to="schedule" text="Schedule" />

        <TaskLink to="assign" text="Assign Crew" />
      </ul>
    </div>
  );
};

const TaskLink = ({ to, text, onClick }) => {
  let { url } = useRouteMatch();
  return (
    <li className="px-2 nav-item">
      <NavLink
        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug  hover:opacity-75 ml-2 "
        to={`${url}/${to}`}
        activeClassName="text-red-500"
        // replace
      >
        {text}
      </NavLink>
    </li>
  );
};
