import { useState, useEffect } from "react";
import {
  getItems,
  addItem,
  removeItem,
  updatedItem,
} from "./utils/local-storage";

function App() {
  const [todos, setTodos] = useState(getItems());
  const [editMode, setEditMode] = useState(false);

  const [oldItem, setOldItem] = useState("");

  const [description, setDescription] = useState("");
  const [descError, setDescError] = useState("");

  const validate = () => {
    let error = "";

    if (description == "") {
      error = "The description field is required";
      // setErrors((prev) => Object.assign(prev, { description: error }));
      setDescError(error);
    } else if (description.trim().length < 5) {
      setDescError("The description must not be less than 5 characters.");
    } else {
      setDescError("");
    }

    return error.length > 0 ? false : true;
  };

  useEffect(() => {
    validate();
  }, [description]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (descError) {
      return;
    }

    if (editMode) {
      updatedItem(oldItem, description);
    } else {
      addItem(description);
    }

    setDescription("");

    setTodos(getItems());
  };

  const deleteItem = (item) => {
    removeItem(item);
    setTodos(getItems());
  };

  const editItem = (item) => {
    setDescription(item);
    setOldItem(item);
    setEditMode(true);
  };

  return (
    <>
      <div className="bg-green-100 w-full min-h-screen">
        <h1 className="py-20 font-bold text-center text-2xl">TODO For Something.</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto shadow-md rounded-md p-4 bg-white"
        >
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-1 text-sm text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="border-o ring-1 ring-green-200 rounded-md px-4 py-2 focus:ring-green-400 hover:ring-green-400 block w-full"
              value={description}
            />
            {descError && (
              <small className="block mt-1 text-sm text-red-400">
                {descError}
              </small>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-green-600 text-white hover:opacity-80 transition ease-in-out duration-200"
          >
            {/* {editMode && "Update Todo"}
            {!editMode && "Add Todo"} */}
            {editMode ? "Update Todo" : "Add Todo"}
          </button>
        </form>

        <div className="mt-10 max-w-xl mx-auto">
          <span className="text-xl font-bold mb-5">Todo Lists</span>
          <ul className=" list-disc list-inside">
            {todos.map((todo, index) => {
              return (
                <li
                  key={index}
                  className="w-full flex items-center justify-between gap-2 py-2 border-t border-b border-white"
                >
                  <span>{todo}</span>
                  <div>
                    <button
                      type="button"
                      className="text-sm text-[#96999e] p-2 "
                      onClick={() => editItem(todo)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-sm text-red-600 hover:opacity-80 p-2"
                      onClick={() => deleteItem(todo)}
                    >
                      X
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
