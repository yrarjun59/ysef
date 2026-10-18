import { notices } from "../../data";
import NoticeDetailClient from "./NoticeDetailClient";

export function generateStaticParams() {
  return notices.map((item) => ({ slug: item.slug }));
}

export default async function NoticeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <NoticeDetailClient slug={slug} />;
}
