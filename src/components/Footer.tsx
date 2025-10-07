const Footer = () => {
  return (
    <footer className="bg-black text-white p-4 mt-12">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
