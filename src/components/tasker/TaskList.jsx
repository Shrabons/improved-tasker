/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { TaskContext, TaskerDispatchContext } from "../../context";
import ConfirmDelete from "./ConfirmDelete";

export default function TaskList({ onEdit }) {
  const [confirm, setConfirm] = useState(false);
  const [confirmID, setConfirmID] = useState(null);
  const dispatch = useContext(TaskerDispatchContext);
  const tasks = useContext(TaskContext);

  const handleConfirmDelete = (task) => {
    setConfirm(true);
    setConfirmID(task);
  };
  return (
    <div className="overflow-auto">
      {confirm && (
        <ConfirmDelete
          confirmId={confirmID}
          onClose={() => setConfirm(false)}
        />
      )}
      <table className="table-fixed overflow-auto xl:w-full">
        <thead>
          <tr>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
              {" "}
              Title{" "}
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
              {" "}
              Description{" "}
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
              {" "}
              Tags{" "}
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
              {" "}
              Priority{" "}
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
              {" "}
              Options{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
            >
              <td>
                <button
                  onClick={() =>
                    dispatch({
                      type: "favourite",
                      id: task.id,
                      fav: task.isFavorite,
                    })
                  }
                >
                  {task.isFavorite ? (
                    <FaStar className="text-xl text-yellow-500" />
                  ) : (
                    <FaStar className="text-xl text-gray-500" />
                  )}
                </button>
              </td>
              <td>{task.title}</td>
              <td>
                <div>{task.description}</div>
              </td>
              <td>
                <ul className="flex justify-center gap-1.5 flex-wrap">
                  {task.tags.map((tag) => (
                    <li key={tag}>
                      <span className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#00D991A1] px-2.5 text-sm capitalize text-[#F4F5F6]">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="text-center">{task.priority}</td>
              <td>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => handleConfirmDelete(task)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onEdit(task)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}