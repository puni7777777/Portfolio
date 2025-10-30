export default function Contact() {
  return (
    <div className="flex justify-center items-center min-h-screen text-white bg-black p-4">
      <div className="flex flex-col gap-4 w-full max-w-md sm:max-w-lg bg-black shadow-md shadow-gray-800 rounded-lg justify-center items-center p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Contact Me</h1>
        <p className="text-gray-300 mb-6 text-center text-sm sm:text-base">
          Feel free to reach out to me via email or social media.
        </p>
        <form className="flex flex-col gap-4 w-full">
          <div>
            <label htmlFor="name" className="block font-medium mb-1 text-sm sm:text-base">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="border-none bg-gray-700 p-3 rounded-lg outline-none caret-purple-500 text-purple-400 w-full text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="border-none bg-gray-700 p-3 rounded-lg outline-none caret-purple-500 text-purple-400 w-full text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium mb-1 text-sm sm:text-base">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Message"
              className="border-none bg-gray-700 p-3 rounded-lg outline-none caret-purple-500 text-purple-400 resize-none w-full text-sm sm:text-base"
              required
            ></textarea>
          </div>
          <div className="flex justify-center text-white font-bold">
            <button
              type="submit"
              className="w-full sm:w-32 bg-purple-600 rounded-full p-3 hover:bg-purple-500 transition text-sm sm:text-base"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
