import type { Metadata } from "next";
import { Cv } from "@/components/cv/Cv";
import { cv } from "@/data/cv";

export const metadata: Metadata = {
  title: "CV",
  description: `${cv.name}: ${cv.headline}. Experience, selected projects, skills and education.`,
  alternates: { canonical: "/cv" },
  openGraph: { url: "/cv", title: `CV — ${cv.name}` },
};

export default function CvPage() {
  return <Cv />;
}