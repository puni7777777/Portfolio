export default function Contact() {
  return (
    <div className="flex justify-center items-center min-h-screen text-white bg-black">
      <div className="flex flex-col gap-4 w-1/2 bg-black shadow-md shadow-gray-800 rounded-lg justify-center items-center p-8">
        <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
        <p className="text-gray-300 mb-6 text-center">
          Feel free to reach out to me via email or social media.
        </p>
        <form className="flex flex-col gap-4 w-full max-w-md">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="border-none bg-gray-700 p-2 rounded-lg outline-none caret-purple-500 text-purple-400 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="border-none bg-gray-700 p-2 rounded-lg outline-none caret-purple-500 text-purple-400 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Message"
              className="border-none bg-gray-700 p-2 rounded-lg outline-none caret-purple-500 text-purple-400 resize-none w-full"
              required
            ></textarea>
          </div>
          <div className="flex justify-center text-white font-bold">
            <button
              type="submit"
              className="w-32 bg-purple-600 rounded-full p-2 hover:bg-purple-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
