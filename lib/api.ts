import axios from "axios";
import type { NotesResponse } from "@/types/notes-response";
import type { Note } from "@/types/note";

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<NotesResponse> => {
  const params: Record<string, unknown> = {
    search,
    page,
  };

  if (tag) {
    params.tag = tag;
  }

  const { data } = await axios.get<NotesResponse>(
    `https://notehub-public.goit.study/api/notes`,
    {
      params,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return data;
};


export const fetchNoteById = async (
  id: string
): Promise<Note> => {
  const { data } = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const { data } = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    note,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return data;
};



