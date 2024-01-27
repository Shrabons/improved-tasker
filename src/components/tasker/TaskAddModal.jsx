/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { TaskerDispatchContext } from "../../context";

export default function TaskAddModal({ onUpdateTask, onClose }) {
  let [task, setTask] = useState(
    onUpdateTask || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
      isFavorite: false,
    }
  );
  const dispatch = useContext(TaskerDispatchContext);
  let [titleError, setTitleError] = useState("");
  let [desError, setDesError] = useState("");
  let [tagsError, setTagsError] = useState("");
  let [priorityError, setPriorityError] = useState("");

  let [isAdd, setIsAdd] = useState(Object.is(onUpdateTask, null));

  const handleChangeVal = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "tags") {
      value = value.split(",");
    }
    setTask({
      ...task,
      [name]: value,
    });
    setTitleError("");
    setDesError("");
    setTagsError("");
    setPriorityError("");
  };

  let handleCreateTask = (e) => {
    e.preventDefault();
    let { title, description, tags, priority } = task;
    if (!title) {
      setTitleError("Please Enter a Title value !");
    } else if (!description) {
      setDesError("Please Enter a description value !");
    } else if (tags.length === 0) {
      setTagsError("Please Enter a tags value !");
    } else if (!priority) {
      setPriorityError("Please Enter a priority value !");
    } else {
      dispatch({
        type: "added",
        newTask: task,
        isAdd,
      });
      onClose();
      toast.success(`The Success Your New Task !`, {
        position: "top-right",
        theme: "colored",
      });
    }
  };
  return (
    <>
      <div className="bg-[rgba(0,0,0,0.8)] flex justify-center items-center w-full h-full absolute top-0 left-0 z-10">
        <form className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 absolute  z-10">
          <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
            {isAdd ? "Add New Task" : "Edit Task"}
          </h2>

          <div className="space-y-9 text-white lg:space-y-10">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="title">Title</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="title"
                id="title"
                value={task.title}
                onChange={handleChangeVal}
                required
              />
              {titleError && <p className="text-red-500">{titleError}</p>}
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="description">Description</label>
              <textarea
                className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                type="text"
                name="description"
                id="description"
                value={task.description}
                onChange={handleChangeVal}
                required
              ></textarea>
              {desError && <p className="text-red-500">{desError}</p>}
            </div>

            <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="tags">Tags</label>
                <input
                  className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                  type="text"
                  name="tags"
                  id="tags"
                  value={task.tags}
                  onChange={handleChangeVal}
                  required
                />
                {tagsError && <p className="text-red-500">{tagsError}</p>}
              </div>

              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="priority">Priority</label>
                <select
                  className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                  name="priority"
                  id="priority"
                  value={task.priority}
                  onChange={handleChangeVal}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {priorityError && (
                  <p className="text-red-500">{priorityError}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-between lg:mt-20">
            <button
              onClick={handleCreateTask}
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              {isAdd ? "Add New Task" : "Edit Task"}
            </button>
            <button
              onClick={onClose}
              type="button"
              className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
