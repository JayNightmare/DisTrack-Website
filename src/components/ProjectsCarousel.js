import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../styles/carousel.css";
import defaultProjects from "../data/projects.json";

function ProjectCard({ project = {} }) {
    const {
        image = "",
        title = "",
        description = "",
        siteUrl = "",
        repoUrl = "",
        tags = [],
    } = project;

    return (
        <div
            className="group block rounded-xl overflow-hidden ring-1 ring-white/10 hover:ring-white/20 transition-shadow"
            aria-label={title || "Project"}
        >
            <div className="relative h-56 md:h-64 lg:h-72">
                {/* Background image */}
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Tags */}
                <div className="absolute right-0 top-0 p-4 md:p-6 text-white flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <span
                            key={`${tag}-${i}`}
                            className="inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-white/20 backdrop-blur"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-white">
                    <h3 className="text-lg md:text-xl font-semibold drop-shadow-sm">
                        {title}
                    </h3>
                    {description && (
                        <p className="mt-1 text-sm text-white/90 line-clamp-2 md:line-clamp-3">
                            {description}
                        </p>
                    )}
                    <div className="mt-3 flex gap-2">
                        {siteUrl && (
                            <a
                                href={siteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-inset ring-white/20 backdrop-blur hover:bg-white/20"
                            >
                                Live site
                            </a>
                        )}
                        {repoUrl && (
                            <a
                                href={repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-inset ring-white/20 backdrop-blur hover:bg-white/20"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Source code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProjectsCarousel() {
    const projects = Array.isArray(defaultProjects) ? defaultProjects : [];
    return (
        <>
            <div className="w-[720px] px-4 md:px-6 lg:px-8 py-6 mx-auto">
                <div className="mx-auto max-w-7xl">
                    <Swiper
                        spaceBetween={24}
                        centeredSlides={false}
                        grabCursor={true}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: true,
                        }}
                        scrollbar={{
                            hide: true,
                        }}
                        modules={[Autoplay, Pagination, Navigation, Scrollbar]}
                        className="mySwiper"
                    >
                        {projects.map((project, idx) => (
                            <SwiperSlide
                                key={project?.id ?? project?.title ?? idx}
                            >
                                <div className="p-1">
                                    <ProjectCard project={project} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}
