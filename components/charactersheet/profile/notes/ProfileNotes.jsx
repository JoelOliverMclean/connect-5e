import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FilePlus } from "lucide-react";

function ProfileNotes({ notes, maxNotes, theme }) {
  const pathName = usePathname();

  const newNote = () => {};

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <h3 className="text-center text-xl">Latest Notes</h3>
        <div
          className="absolute top-0 bottom-0 right-0 flex flex-col justify-center p-1"
          onClick={newNote}
        >
          <p>
            <FilePlus color="var(--foreground)" size={24} />
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-1">
        {notes.length > 0 ? (
          notes.slice(0, maxNotes).map((note) => (
            <Link
              key={note.name}
              className={`${theme.bg} border ${theme.border} shadow-md ${theme.shadow} p-2 rounded-lg flex flex-col gap-2`}
              href={`${pathName}/notes/${note.id}`}
            >
              <h4 className="text-center font-bold">{note.name}</h4>
              <p className="truncate-three-lines text-sm">{note.contents}</p>
            </Link>
          ))
        ) : (
          <div className="text-center col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 opacity-60 flex flex-col gap-2">
            <p>No notes yet.</p>
            <p>
              Use the new note button above and to the right to add your first
              note
            </p>
          </div>
        )}
      </div>
      {notes.length > maxNotes && (
        <div className="p-1">
          <div
            className={`text-center ${theme.bg} ${theme.hoverBG} duration-300 cursor-pointer rounded-lg p-2 border shadow ${theme.border} ${theme.shadow}`}
          >
            View all
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileNotes;
