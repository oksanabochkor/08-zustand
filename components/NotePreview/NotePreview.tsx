import { fetchNoteById } from "../../lib/api";

export default async function NotePreview({
  id,
}: {
  id: string;
}) {
  const note = await fetchNoteById(id);

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}
