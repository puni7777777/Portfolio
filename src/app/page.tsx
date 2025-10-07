export default function Home() {
  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <section className="text-center mt-12 mb-16">
        <h1 className="text-5xl font-bold mb-4 text-purple-500">Hi, I&apos;m PUNITH KUMAR REDDY</h1>
        <p className="text-xl text-gray-300 mb-6">
          A passionate Mechanical Engineer specializing in CAD and design technologies.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/projects" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-500 transition">
            View My Work
          </a>
          <a href="/contact" className="border border-purple-500 text-purple-500 px-6 py-3 rounded-lg hover:bg-purple-500 hover:text-white transition">
            Get In Touch
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-500">Skills & Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white">CAD Software</h3>
            <p className="text-gray-300">AutoCAD, ActCAD</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white">3D Modeling</h3>
            <p className="text-gray-300">SolidWorks, CATIA, NX UG</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white">Tools</h3>
            <p className="text-gray-300">ANSYS, Microsoft Office</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white">Languages</h3>
            <p className="text-gray-300">C, Python, Next.js</p>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="mb-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-purple-500">About Me</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          I love designing innovative mechanical solutions and bringing ideas to life through precision engineering. With a keen eye for detail and a passion for learning, I strive to create efficient and reliable systems that make a tangible impact.
        </p>
         <a href="/about" className="text-purple-400 hover:text-purple-300 hover:underline">
          Learn more about me →
        </a>
      </section>
    </div>
  );
}
