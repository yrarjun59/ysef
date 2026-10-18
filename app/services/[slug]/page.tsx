import { services } from "../../data";
import ServiceDetailClient from "./ServiceDetailClient";

export function generateStaticParams() {
  return services.map((item) => ({ slug: item.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServiceDetailClient slug={slug} />;
}
