import type { Metadata } from "next";

type Props = {
  params: {
    slug?: string[];
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const filter = params.slug?.join(" / ") || "All notes";

  const title = `Notes filtered by: ${filter} | NoteHub`;
  const description = `Browse notes filtered by ${filter}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-site-url.com/notes/filter/${params.slug?.join("/")}`,
      images: [
        "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      ],
    },
  };
}


