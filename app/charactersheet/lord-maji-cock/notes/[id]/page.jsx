"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { use, useState } from "react";
import characterSheet from "@/mockdata/characters/LordMajiCock";
import CharacterSheetHeader from "@/components/charactersheet/header/CharacterSheetHeader";
import { ArrowLeft, MoveLeft, Pencil, SkipBack } from "lucide-react";
import TipTapToolbar from "@/components/TipTapToolbar";
import Underline from "@tiptap/extension-underline";
import { useRouter } from "next/navigation";
import EditProfileNote from "@/components/charactersheet/profile/notes/EditProfileNote";
import themes from "@/theme/themes";

function EditNotePage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  return <EditProfileNote id={id} theme={themes.blue} />;
}

export default EditNotePage;
