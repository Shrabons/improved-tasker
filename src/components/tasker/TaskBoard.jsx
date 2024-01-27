import { useContext, useState } from "react";
import { TaskContext } from "../../context";
import ActionTask from "./ActionTask";
import TaskAddModal from "./TaskAddModal";
import TaskList from "./TaskList";

export default function TaskBoard() {
  let [showTaskModal, setShowTaskModal] = useState(false);
  let [updateTask, setUpdateTask] = useState(null);
  const tasks = useContext(TaskContext);

  const handleEditModale = (editTask) => {
    setUpdateTask(editTask);
    setShowTaskModal(true);
  };

  const handleTaskAddModal = () => {
    setUpdateTask(null);
    setShowTaskModal(true);
  };

  return (
    <>
      {showTaskModal && (
        <TaskAddModal
          onClose={() => setShowTaskModal(false)}
          onUpdateTask={updateTask}
        />
      )}
      <section className="mb-20 flex justify-center" id="tasks">
        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <ActionTask onAddTask={handleTaskAddModal} />
            {tasks.length > 0 ? (
              <TaskList onEdit={handleEditModale} />
            ) : (
              <p className="text-3xl text-center">Task List is empty!</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
