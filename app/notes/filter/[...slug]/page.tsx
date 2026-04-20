import type { Metadata } from "next";

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

// ✅ FIX: await params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const filter = slug?.join(" / ") || "All notes";

  const title = `Notes filtered by: ${filter} | NoteHub`;
  const description = `Browse notes filtered by ${filter}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-mu-lime.vercel.app/notes/filter/${slug?.join("/")}`,
      images: [
        "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      ],
    },
  };
}

// ✅ default export обовʼязково
export default function FilterPage() {
  return <div>Filtered notes page</div>;
}


