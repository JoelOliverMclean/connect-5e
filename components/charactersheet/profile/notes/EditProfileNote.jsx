"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { use, useState } from "react";
import characterSheet from "@/mockdata/characters/LordMajiCock";
import CharacterSheetHeader from "@/components/charactersheet/header/CharacterSheetHeader";
import { ArrowLeft, MoveLeft, Pencil, SkipBack, Trash } from "lucide-react";
import TipTapToolbar from "@/components/TipTapToolbar";
import Underline from "@tiptap/extension-underline";
import { useRouter } from "next/navigation";

function EditProfileNote({ id, theme }) {
  const [editing, setEditing] = useState(false);

  const router = useRouter();
  const [note, setNote] = useState(
    characterSheet.notes.find((n) => n.id === id)
  );
  const [editedNote, setEditedNote] = useState(null);

  const goBack = () => {
    router.back();
  };

  const handleChange = (newContent) => {
    if (!editedNote) {
      setEditedNote({ ...note });
    }
    setEditedNote({ ...editedNote, contents: newContent });
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: `flex-grow overflow-y-auto flex flex-col p-2 justify-start ${
          editing
            ? "bg-[#111] border-b border-l border-r border-t-0 border-2"
            : "border-0 rounded-t-lg"
        } ${
          theme.border
        } items-start w-full gap-1 text-base rounded-b-lg outline-none`,
      },
    },
    content: note?.contents,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  const updateTitle = (e) => {
    var newTitle = e.target.value;
    console.log(newTitle);
    setEditedNote({ ...editedNote, name: newTitle });
  };

  const saveChanges = () => {
    console.log(editedNote);
    setNote({ ...(editedNote ?? note) });
    setEditedNote(null);
    setEditing(false);
  };

  const deleteNote = () => {};

  const toggleEditing = () => {
    if (!editing) {
      setEditedNote({ ...note });
    }
    setEditing(!editing);
  };

  const discardChanges = () => {
    setEditedNote(null);
    editor.commands.setContent(note.contents);
    setEditing(false);
  };

  return (
    <div className={`flex flex-col h-full ${theme.text}`}>
      <header className={`sticky top-0 z-10`}>
        <div className={`${theme.bg} border-b-2 ${theme.border}`}>
          <div className="py-1 md:p-2">
            <CharacterSheetHeader
              characterSheet={characterSheet}
              theme={theme}
              dm={false}
            />
          </div>
        </div>
        <div className={`p-2 bg-gray-900`}>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-0 flex items-center">
              <div className="p-1" onClick={goBack}>
                <ArrowLeft color="var(--foreground)" size={24} />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 p-1">
              {editing ? (
                <input
                  type="text"
                  defaultValue={note.name}
                  onChange={updateTitle}
                  className={`w-[240px] md:w-[400px] border ${theme.border} bg-[#111] p-1 text-xl text-center focus:ring-0 focus:outline-none rounded-lg`}
                />
              ) : (
                <h1 className="text-center text-2xl font-bold">{note.name}</h1>
              )}
            </div>
            <div className="absolute top-0 bottom-0 right-0 flex items-center">
              <div
                className="p-1"
                onClick={!editing ? toggleEditing : deleteNote}
              >
                {editing ? (
                  <Trash color="var(--foreground)" />
                ) : (
                  <Pencil color="var(--foreground)" />
                )}
              </div>
            </div>
          </div>
        </div>
        {editing && (
          <div className="px-2 md:px-4 md:pt-2 bg-gray-900">
            <TipTapToolbar
              editor={editor}
              content={note?.contents}
              theme={theme}
            />
          </div>
        )}
      </header>

      <div className=" overflow-y-auto flex-grow px-2 md:px-4 pb-2 md:pb-4 flex flex-col">
        <EditorContent
          editor={editor}
          className="flex-grow flex flex-col overflow-y-auto"
        />
      </div>
      {editing && (
        <div className="p-2 md:p-4 mb-2 md:mb-4 flex gap-3 md:justify-center md:gap-10">
          <div
            className={`bg-green-800 flex-grow md:px-5 md:flex-grow-0 text-center rounded-lg p-2 border shadow ${theme.border} ${theme.shadow}`}
            onClick={saveChanges}
          >
            Save
          </div>
          <div
            className={`bg-red-800 flex-grow md:px-5 md:flex-grow-0 text-center rounded-lg p-2 border shadow ${theme.border} ${theme.shadow}`}
            onClick={discardChanges}
          >
            Discard Changes{" "}
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfileNote;
