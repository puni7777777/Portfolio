export default function Contact() {
  return (
    <div className="flex justify-center items-center text-white p-4">
      <div className="flex flex-col gap-4 w-full max-w-md sm:max-w-lg shadow-md shadow-gray-800 rounded-lg justify-center items-center p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Contact Me</h1>
        <p className="text-gray-300 mb-6 text-center text-sm sm:text-base">
          Feel free to reach out to me via email or social media.
        </p>
        <form className="flex flex-col gap-5 w-full">
          <div>
            <label htmlFor="name" className="block font-medium mb-1.5 text-sm sm:text-base text-zinc-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-lg p-3 text-zinc-100 placeholder:text-zinc-500 text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1.5 text-sm sm:text-base text-zinc-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-lg p-3 text-zinc-100 placeholder:text-zinc-500 text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium mb-1.5 text-sm sm:text-base text-zinc-200">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="How can I help you?"
              className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-lg p-3 text-zinc-100 placeholder:text-zinc-500 text-sm sm:text-base resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
              required
            ></textarea>
          </div>
          <div className="flex justify-center text-white font-bold pt-2">
            <button
              type="submit"
              className="w-full justify-center bg-purple-600 rounded-full py-3 px-6 hover:bg-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition font-semibold text-sm sm:text-base cursor-pointer shadow-lg shadow-purple-600/30"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
