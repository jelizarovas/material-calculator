import React, { useState, useRef, useCallback } from "react";
import { FieldsList } from "./FieldsList";
import { PacketList } from "./PacketList";
import { PreviewPDF } from "./PreviewPDF";
import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import { useDrop, useDrag } from "react-dnd";
import update from "immutability-helper";

const styles = {
  width: "612px",
  height: "792px",
};

const fieldExample = {
  id: "234dss",
  place: [
    {
      pdfId: "asdvxzcvzxcv",
      pageNum: 1,
      x: 0,
      y: 0,
    },
  ],
  name: "Full Name",
  value: "Arnas Jelizarovas",
};

export const Paramount = () => {
  const [fields, setDields] = useState([fieldExample]);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const getCoordinates = (e) => {
    console.log("getcoordinates");
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.
    setCoordinates({ x: x.toFixed(2), y: -(y - 792).toFixed(2) });
    // console.log("Left? : " + x + " ; Top? : " + -(y - 792) + ".");
  };

  return (
    <div className="flex  justify-around items-start ">
      <PacketList />
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <FieldsList />
        {/* <div className="flex">{`x: ${coordinates.x}, y: ${coordinates.y}`}</div> */}
        {/* <Dropzone style={styles} className="bg-red-500" allowedDropEffect="move" onClick={getCoordinates}>
          DROPZONE */}
        {/* </Dropzone> */}
        {/* <GlobalBox /> */}
        <LocalBox />
        <Box />
      </DndProvider>
      {/* <PreviewPDF /> */}
    </div>
  );
};

const style = {
  minWidth: "612px",
  minHeight: "792px",
};

function selectBackgroundColor(isActive, canDrop) {
  if (isActive) {
    return "darkgreen";
  } else if (canDrop) {
    return "darkkhaki";
  } else {
    return "#222";
  }
}
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

function LocalBox() {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 80, title: "Drag me around" },
    b: { top: 180, left: 20, title: "Drag me too" },
  });
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

  const ref = useLocalDrop(moveBox, setBoxes);
  return (
    <div ref={ref} className="LocalBox bg-purple-900 relative" style={styles}>
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key];
        return (
          <Box key={key} id={key} left={left} top={top} hideSourceOnDrag={true}>
            {title}
          </Box>
        );
      })}
    </div>
  );
}

const Box = ({ id, left, top, hideSourceOnDrag = true, children }) => {
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
    return <div ref={drag} />;
  }
  return (
    <div ref={drag} className="absolute bg-green-500 text-white" style={{ left, top }} role="Box">
      {children}
    </div>
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

          setBoxes((b) => ({ ...b, [item.id]: { title: item.name, left: x, top: y } }));
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
