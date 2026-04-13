"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  return (
    <Modal onClose={() => router.back()}>
      <div>
        <button onClick={() => router.back()}>
          Close
        </button>

        <h2>{data.title}</h2>
        <p>{data.content}</p>
        <p>{data.tag}</p>
        <p>{new Date(data.createdAt).toLocaleDateString()}</p>
      </div>
    </Modal>
  );
}





