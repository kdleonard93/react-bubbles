import React, { useState } from "react";
import axiosWithAuth from "../utils/api";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(updateColors);
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: { hex: "" }
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log(color.id);
  };

  const saveEdit = e => {
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`./api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log("finished");
      })
      .error(err => console.log(err));
    e.preventDefault();
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        updateColors(colors => colors.filter(i => i.id !== color.id));
      })
      .catch(error => console.log(error));
  };
  const handleColor = e => {
    setNewColor({
      ...newColor,
      color: e.target.value
    });
  };
  // const handleCode = e => {
  //   setNewColor({
  //       ...newColor,
  //       code: state.list.map(todo => {
  //         console.log(todo);
  //         return todo.id === action.payload
  //           ? { ...todo, completed: !todo.completed }
  //           : todo;
  //   })
  const addColor = e => {
    axiosWithAuth()
      .post(`/api/colors/`, newColor)
      .then(res => updateColors([...colors, newColor]))
      .catch(error => console.log(error));
    e.preventDefault();
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color, e);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />

      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <input
          name="color"
          value={newColor.color}
          onChange={e => {
            setNewColor({
              ...newColor,
              color: e.target.value
            });
          }}
        />
        <input
          name="color"
          value={newColor.code.hex}
          onChange={e => {
            setNewColor({
              ...newColor,
              code: { hex: e.target.value }
            });
          }}
        />
        <button>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
