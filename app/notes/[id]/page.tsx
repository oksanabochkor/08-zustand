import type { Metadata } from "next";
import { fetchNoteById } from "@/lib/api";

type Params = {
  id: string;
};

export async function generateMetadata(
  params: Promise<Params>
): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    return {
      title: `${note.title} | NoteHub`,
      description: note.content?.slice(0, 100),

      openGraph: {
        title: `${note.title} | NoteHub`,
        description: note.content?.slice(0, 100),
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

// 🔥 ОЦЕ ГОЛОВНЕ, ЧОГО НЕМА У ТЕБЕ
export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const note = await fetchNoteById(id);

  return (
    <main>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </main>
  );
}


