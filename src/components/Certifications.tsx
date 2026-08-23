import Image from "next/image";
import Reveal from "./Reveal";

const CERTIFICATIONS = [
  {
    name: "ZED Certified",
    src: "/images/certifications/zed-certified-v2.png",
    width: 110,
    height: 91,
  },
  {
    name: "MSME Registered",
    src: "/images/certifications/msme.svg",
    width: 90,
    height: 90,
  },
  {
    name: "Make in India",
    src: "/images/certifications/make-in-india.png",
    width: 110,
    height: 110,
  },
];

export default function Certifications() {
  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 text-center lg:px-10">
        <Reveal>
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.3em] text-orange-dark">
            Certified &amp; Recognized
          </p>
          <h2 className="font-display text-3xl font-semibold uppercase leading-tight text-ink sm:text-4xl">
            Our Certifications
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.name} className="flex flex-col items-center gap-3">
                <div className="flex h-24 w-40 items-center justify-center">
                  <Image
                    src={cert.src}
                    alt={cert.name}
                    width={cert.width}
                    height={cert.height}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="font-display text-xs font-semibold uppercase tracking-wider text-ink/60">
                  {cert.name}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
