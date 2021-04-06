import React from "react";
import { useDrag } from "react-dnd";

const fields = [
  { name: "Full Name", id: "dfgsd" },
  { name: "Phone Number", id: "5t4e" },
  { name: "Email", id: "ert34" },
  { name: "Origin Address", id: "asdf4" },
];

export const FieldsList = (props) => {
  return (
    <div className="my-10 z-10 flex flex-col">
      <h1>Fields</h1>
      {fields.map((field) => {
        return <ListItem key={field.id} id={field.id} name={field.name} value={field.value} />;
      })}
    </div>
  );
};

const ListItem = (props) => {
  const { name, value, id } = props;

  return (
    <Box {...props}>
      <div className="bg-purple-500 rounded-md p-1 my-1 select-none hover:bg-purple-700 ">
        <div className="handle  text-white cursor-pointer text-xs pb-1 pl-2 ">:: {name}</div>
        {!!value && <div className="bg-white px-4 py-1 rounded-sm">Arnas Jelizarovas</div>}
      </div>
    </Box>
  );
};

const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  float: "left",
};
export const Box = (props) => {
  const { name } = props;
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: "field",
      item: props,
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          let alertMessage = "";
          const isDropAllowed =
            dropResult.allowedDropEffect === "any" || dropResult.allowedDropEffect === dropResult.dropEffect;
          if (isDropAllowed) {
            const isCopyAction = dropResult.dropEffect === "copy";
            const actionName = isCopyAction ? "copied" : "moved";
            alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`;
          } else {
            alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`;
          }
          //   console.log({ monitor });
        }
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name]
  );
  return (
    <div {...props} ref={drag} style={{ ...style, opacity }}>
      {props.children}
    </div>
  );
};
