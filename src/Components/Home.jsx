import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../Redux/PasteSlice";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.Paste.pastes);

  function createMyPaste() {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }
    //after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({}); // Remove all pasteId from URL after create/update a paste
  }

  
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [allPastes, pasteId]);

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            // Dynamic width based on wheather pasteId is present
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            } text-black border border-gray-100 rounded-md p-2`}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={createMyPaste}
            className="text-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 text-sm rounded-lg dark:hover:bg-blue-700 w-[50%]"
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>

          {pasteId && <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 text-sm rounded-lg dark:hover:bg-blue-700"
          >
            
          </button> }
        </div>
        <div>
          <textarea
            className="rounded-2xl mt-4 min-w-[500px] p-4 border border-gray-200 "
            value={value}
            placeholder="Enter Content Here"
            onChange={(e) => setValue(e.target.value)}
            rows={15}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
