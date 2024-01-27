import { useReducer } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TaskBoard from "./components/tasker/TaskBoard";
import { TaskContext, TaskerDispatchContext } from "./context";
import { defaultTask, tasksReducers } from "./reducers/taskReducers";

export default function App() {
  const [tasks, dispatch] = useReducer(tasksReducers, defaultTask);
  return (
    <TaskContext.Provider value={tasks}>
      <TaskerDispatchContext.Provider value={dispatch}>
        <Header />
        <HeroSection />
        <TaskBoard />
        <Footer />
        <ToastContainer />
      </TaskerDispatchContext.Provider>
    </TaskContext.Provider>
  );
}
