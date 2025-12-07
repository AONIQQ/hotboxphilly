import { HomeContent } from "@/components/HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hot Box Philly | Co-Packing & Manufacturing",
  description: "Hot Box Philly offers premium co-packing, R&D, and food manufacturing services. Specialized in hot sauce, pickles, and acidified foods.",
};

export default function Home() {
  return <HomeContent />;
}
