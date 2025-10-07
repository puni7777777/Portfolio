import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-black text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-purple-500 hover:shadow-lg hover:shadow-purple-500/50 transition duration-200">
            PUNITH
          </Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-purple-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-purple-500">
              About
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-purple-500">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/typing" className="hover:text-purple-500">
              Typing
            </Link>
          </li>
          <li>
            <Link href="/texthandle" className="hover:text-purple-500">
              TextHandle
            </Link>
          </li>
          <li>
            <Link href="/fileupload" className="hover:text-purple-500">
              File Upload
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-purple-500">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
