import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../Redux/PasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Paste() {
  const pastes = useSelector((state) => state.Paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 ">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2 rounded=[0.3rem] border border-[rgba(128,121,121,0.3)] mt-6">
          <input
            className="p-2 rounded-2xl min-w-[600px] mt-5"
            type="search"
            placeholder="Search Here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full px-4 pt-4 flex flex-col gap-y-5 ">
          {filteredData.length > 0 &&
            filteredData.map((paste) => {
              return (
                <div className=" border w-full gap-y-6 justify-betweenflex flex-col sm:flex-row p-4 rounded=[0.3rem]" key={paste?._id}>
                  <div>{paste.title}</div>
                  <div>{paste.content}</div>
                  <div className="flex flex-row gap-4 place-content-evenly">
                    <button>
                      <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                    </button>

                    <button>
                      <Link to={`/pastes/${paste?._id}`}>View</Link>
                    </button>

                    <button onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied To Clipboard");
                      }}
                    >
                      Copy
                    </button>

                    <button>Share</button>
                  </div>
                  <div>{paste.createdAt}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Paste;
