import { About } from "@/components/About";
import { Building } from "@/components/Building";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Stack } from "@/components/Stack";
import { Teardown } from "@/components/teardown/Teardown";
import { Work } from "@/components/work/Work";

/** Section order matters: the nav's "current section" readout follows DOM order of [data-sec]. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Teardown />
      <Work />
      <About />
      <Experience />
      <Stack />
      <Building />
      <Contact />
    </>
  );
}
