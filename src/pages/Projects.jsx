import { useState, useEffect } from "react";

const projects = [
  {
    name: "Gyansetu",
    description: "A learning platform for skill development.",
    image: "/gyansetu.jpg",
    link: "/projects/gyansetu",
  },
  {
    name: "Swasthya Setu",
    description: "Healthcare platform connecting patients and doctors.",
    image: "/swasthya-setu.jpg",
    link: "/projects/swasthya-setu",
  },
  {
    name: "Land To Lavish",
    description: "Real estate property showcase with AI chatbot.",
    image: "/landtolavish.jpg",
    link: "/projects/land-to-lavish",
  },
  {
    name: "School Management",
    description: "Student admissions, fee & attendance management.",
    image: "/school-management.jpg",
    link: "/projects/school-management",
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".project-card");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-20 min-h-screen overflow-hidden">
      {/* ✅ Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200 via-orange-300 to-white bg-[length:300%_300%] animate-gradient-x opacity-90" />

      {/* ✅ Floating abstract shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Circle */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-orange-400/30 rounded-full animate-float-slow" />
        {/* Triangle */}
        <div className="absolute bottom-20 right-16 w-0 h-0 
          border-l-[60px] border-r-[60px] border-b-[100px] 
          border-l-transparent border-r-transparent border-b-red-400/40 
          animate-float" />
        {/* Polygon (hexagon-like) */}
        <div className="absolute top-1/3 left-1/2 w-32 h-32 bg-black/20 rotate-12 clip-hexagon animate-spin-slow" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-lg">
            Our Projects
          </h2>
          <p className="text-gray-800 mt-4 max-w-2xl mx-auto">
            Discover our latest work blending technology with modern design.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6">
          {projects.map((project, index) => (
            <div
              key={project.name}
              id={`project-${index}`}
              className={`project-card group cursor-pointer transform transition-all duration-700 ${
                isVisible[`project-${index}`]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Card */}
              <div className="relative bg-white/90 backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 rounded-xl">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Subtle dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
