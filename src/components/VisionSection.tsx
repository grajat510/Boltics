"use client";

import * as React from "react";
import Image from "next/image";
import { HTMLMotionProps, Variants, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface GalleryGridCellProps extends HTMLMotionProps<"div"> {
  index: number;
}

const SPRING_TRANSITION_CONFIG = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
} as const;

const filterVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
};

const areaClasses = [
  "col-start-2 col-end-3 row-start-1 row-end-3",
  "col-start-1 col-end-2 row-start-2 row-end-4",
  "col-start-1 col-end-2 row-start-4 row-end-6",
  "col-start-2 col-end-3 row-start-3 row-end-5",
];

const ContainerStagger = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ transition, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        staggerChildren: transition?.staggerChildren ?? 0.2,
        delayChildren: transition?.delayChildren ?? 0.2,
        duration: 0.3,
        ...transition,
      }}
      {...props}
    />
  )
);
ContainerStagger.displayName = "ContainerStagger";

const ContainerAnimated = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ transition, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={filterVariants}
      transition={{ ...SPRING_TRANSITION_CONFIG, duration: 0.3, ...transition }}
      {...props}
    />
  )
);
ContainerAnimated.displayName = "ContainerAnimated";

const GalleryGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-2 grid-rows-[50px_150px_50px_150px_50px] gap-4",
        className
      )}
      {...props}
    />
  )
);
GalleryGrid.displayName = "GalleryGrid";

const GalleryGridCell = React.forwardRef<HTMLDivElement, GalleryGridCellProps>(
  ({ className, transition, index, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: index * 0.2,
        delayChildren: transition?.delayChildren ?? 0.2,
      }}
      className={cn(
        "relative overflow-hidden rounded-xl shadow-xl",
        areaClasses[index],
        className
      )}
      {...props}
    />
  )
);
GalleryGridCell.displayName = "GalleryGridCell";

const EXHIBITION_PHOTOS = [
  { src: "/images/exhibitions/exhibition-booth-4.jpeg", alt: "Farmers reviewing cultivator shovels laid out at an Aggarwal Industries stall" },
  { src: "/images/exhibitions/exhibition-booth-1.jpeg", alt: "Aggarwal Industries exhibition stall with the team greeting visitors" },
  { src: "/images/exhibitions/exhibition-booth-3.jpeg", alt: "Farmers examining shovels and bolts at an Aggarwal Industries stall" },
  { src: "/images/exhibitions/exhibition-booth-2.jpeg", alt: "Aggarwal Industries stall at a rural trade fair" },
];

export default function VisionSection() {
  return (
    <section className="bg-cream py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <ContainerStagger>
          <ContainerAnimated className="mb-3 block font-display text-sm font-semibold uppercase tracking-[0.3em] text-orange-dark">
            On the Ground, Across India
          </ContainerAnimated>
          <ContainerAnimated className="font-display text-3xl font-semibold uppercase leading-tight text-ink sm:text-4xl">
            Where Vision Meets Expression
          </ContainerAnimated>
          <ContainerAnimated className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink/60">
            From district Kisan Melas to state-level agricultural exhibitions, Aggarwal
            Industries has showcased its cultivator shovels, seed drill shovels and shovel
            bolts directly to the farmers who put them to work in the field. Every stall is
            a chance to demonstrate what heat-treated, deep-countered manufacturing really
            looks like &mdash; up close, in person, season after season.
          </ContainerAnimated>
          <ContainerAnimated>
            <a
              href="#contact"
              className="mt-7 inline-flex items-center gap-2 rounded-sm bg-orange px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-orange-dark"
            >
              Get In Touch <ArrowRight size={16} />
            </a>
          </ContainerAnimated>
        </ContainerStagger>

        <GalleryGrid>
          {EXHIBITION_PHOTOS.map((photo, index) => (
            <GalleryGridCell index={index} key={photo.src}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1024px) 45vw, 320px"
                className="object-cover object-center"
              />
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  );
}
