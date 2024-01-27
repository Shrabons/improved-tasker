import { useContext } from "react";
import { TaskerDispatchContext } from "../../context";

/* eslint-disable react/prop-types */
export default function ConfirmDelete({ onClose, confirmId }) {
  const dispatch = useContext(TaskerDispatchContext);

  return (
    <>
      <div className="bg-[rgba(0,0,0,0.8)] flex justify-center items-center w-full h-full absolute top-0 left-0 z-10">
        <div className="mx-auto my-10 w-full max-w-[540px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 absolute   transform-[translateX(-50%) ] z-10">
          <p className="mb-9   font-bold text-white lg:mb-11 ">
            The Confirm Delete dialog box lists {confirmId.title} that will be
            deleted with the selected one.
          </p>

          <div className="mt-16 flex  justify-between lg:mt-20">
            <button
              onClick={() => {
                dispatch({
                  type: "delete",
                  id: confirmId.id,
                });
                onClose();
              }}
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              confirm delete
            </button>
            <button
              onClick={onClose}
              type="button"
              className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
