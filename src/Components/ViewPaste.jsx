/* eslint-disable no-undef */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ViewPaste() {
  const { id } = useParams();

  console.log(id);

  const pastes = useSelector((state) => state.Paste.pastes);

  const Paste = pastes.filter((p) => p._id === id)[0];

  console.log("Paste->", paste);
  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <input
          className="w-full text-black border border-input rounded-md p-2"
          type="text"
          placeholder="Title"
          value={Paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={Paste.content}
          disabled
          placeholder="Enter Content Here"
          onChange={(e) => setValue(e.target.value)}
          rows={15}
        />
      </div>
    </div>
  );
}

export default ViewPaste;
