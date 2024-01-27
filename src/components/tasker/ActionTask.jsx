/* eslint-disable react/prop-types */
import { useContext } from "react";
import { toast } from "react-toastify";
import { TaskerDispatchContext } from "../../context";
import SearchTask from "./SearchTask";

export default function ActionTask({ onAddTask }) {
  const dispatch = useContext(TaskerDispatchContext);
  return (
    <div className="mb-14 items-center justify-between sm:flex">
      <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
      <div className="flex items-center space-x-5">
        <SearchTask />
        <button
          onClick={onAddTask}
          className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
        >
          Add Task
        </button>
        <button
          onClick={() => {
            dispatch({
              type: "allDelete",
            });
            toast.info("All Task Delete !", {
              position: "top-center",
            });
          }}
          className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
        >
          Delete All
        </button>
      </div>
    </div>
  );
}
