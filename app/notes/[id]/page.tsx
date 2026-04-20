import type { Metadata } from "next";
import { fetchNoteById } from "@/lib/api";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  try {
    const note = await fetchNoteById(params.id);

    const title = note.title || "Note details";
    const description = note.content?.slice(0, 100) || "Note description";

    return {
      title: `${title} | NoteHub`,
      description,
      openGraph: {
        title: `${title} | NoteHub`,
        description,
        url: `https://08-zustand-mu-lime.vercel.app/notes/${params.id}`,
        images: [
          "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
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

export default async function Page({ params }: Props) {
  const note = await fetchNoteById(params.id);

  if (!note) {
    notFound(); // 👈 правильний Next.js спосіб
  }

  return (
    <main>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </main>
  );
}



