

import type { Metadata } from "next";
import { fetchNoteById } from "@/lib/api";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    const title = note.title;
    const description = note.content?.slice(0, 100);

    return {
      title: `${title} | NoteHub`,
      description,

      openGraph: {
        title: `${title} | NoteHub`,
        description,
        url: `https://08-zustand-mu-lime.vercel.app/notes/${id}`,
        
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          },
        ],
      },
    };
  } catch {
    return {
      title: "Note not found | NoteHub",
      description: "This note does not exist",
    };
  }
}
