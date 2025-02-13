import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../Redux/PasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { formatDate } from "../date/formatDate";
import { Calendar } from "lucide-react";

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
        <div className="w-full flex gap-3 px-4 py-2 rounded=[0.3rem] border border-[rgba(128,121,121,0.3)] mt-4">
          <input
            className="p-2 rounded-2xl min-w-[600px] my-5 border-gray-300 border-[2px] focus:border-blue-300"
            type="search"
            placeholder="Search Here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full pb-6 px-4 pt-6 flex flex-col gap-y-5 border border-[rgba(128,121,121,0.3)]">
          {filteredData.length > 0 &&
            filteredData.map((paste) => {
              return (
                <div className=" border w-full gap-y-6 justify-betweenflex flex-col sm:flex-row p-4 rounded=[0.3rem]" key={paste?._id}>
                  <div>{paste.title}</div>
                  <div>{paste.content}</div>
                  <div className="flex flex-row gap-4 place-content-evenly my-4">
                    <button>
                      <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                    </button>

                    <button>
                      <Link to={`/pastes/${paste?._id}`}>View</Link>
                    </button>

                    <button onClick={() => handleDelete(paste?._id)}>
                      <Link>Delete</Link>
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied To Clipboard");
                      }}
                    >
                      <Link>Copy</Link>
                    </button>

                  </div>
                  <div className="gap-x-2 flex justify-end text-blue-600 font-medium mt-5">
                    <Calendar className=" text-blue-600" size={20} />
                    {formatDate(paste?.createdAt)}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Paste;
