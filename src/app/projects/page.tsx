const projects = [
  {
    title: "Arrora",
    description: "An e-commerce website for natural foods, built with modern web technologies.",
    link: "https://github.com/puni7777777/arrorra",
  },
  {
    title: "Arrora Next.js 14",
    description: "E-commerce website for natural foods, rewritten in Next.js 14.",
    link: "https://github.com/puni7777777/arrorra_nxtjs14",
  },
  {
    title: "Cars - Corolla Effect",
    description: "A component for creating corolla effects, usable in larger projects.",
    link: "https://github.com/puni7777777/cars",
  },
  {
    title: "DSA Tracker",
    description: "An app to track personalized DSA preparation progress, using localStorage for data storage. Questions are categorized for home page responses.",
    link: "https://github.com/puni7777777/Dsa-Tracker",
  },
  {
    title: "Letter Fold Animation",
    description: "A page folding animation that triggers after clicking the submit button on a form.",
    link: "https://github.com/puni7777777/letterFold",
  },
  {
    title: "Login Component",
    description: "A reusable login component for Next.js 14 projects.",
    link: "https://github.com/puni7777777/loginComponent",
  },
  {
    title: "Text Handle",
    description: "A tool for text manipulation, including removing unnecessary line endings, to reduce time and increase productivity.",
    link: "https://github.com/puni7777777/texthandle",
  },
  {
    title: "Text Handle v1.1",
    description: "Updated version of the text manipulation tool for enhanced productivity.",
    link: "https://github.com/puni7777777/TextHandle_1.1",
  },
  {
    title: "TEXT_HANDLE",
    description: "A project for text manipulation with features like removing line endings, aiding in productivity.",
    link: "https://github.com/puni7777777/TEXT_HANDLE",
  },
  {
    title: "Punith Tools",
    description: "A collection of useful tools.",
    link: "https://github.com/puni7777777/Punith",
  },
];

export default function Projects() {
  return (
    <div className="container mx-auto p-6">
      <section className="mt-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-purple-500">Projects</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-gray-600 bg-gray-800 rounded-lg p-4 hover:shadow-lg hover:shadow-purple-500/20 transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2 text-white">{project.title}</h2>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <a
                href={project.link}
                className="text-purple-400 hover:text-purple-300 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
