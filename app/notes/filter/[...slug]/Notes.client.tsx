"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Link from "next/link";

import { fetchNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";

interface Props {
  tag: string;
}

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", tag, debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
    placeholderData: (prev) => prev,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <SearchBox
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      {/* ✅ ЗАМІНА КНОПКИ НА LINK */}
      <Link href="/notes/action/create">
        Create note
      </Link>

      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

      {data?.totalPages && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}






