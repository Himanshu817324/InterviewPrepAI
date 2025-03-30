const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 bottom-0 top-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">Interview Prep AI</h2>
          <p className="text-sm opacity-70">
            Your AI-powered interview assistant.
          </p>
        </div>

        {/* Middle Section - Links */}
        <div className="mt-4 md:mt-0 flex space-x-6">
          <a href="/about" className="hover:text-gray-400 transition">
            About
          </a>
          <a href="/contact" className="hover:text-gray-400 transition">
            Contact
          </a>
          <a href="/privacy" className="hover:text-gray-400 transition">
            Privacy
          </a>
        </div>

        {/* Right Section - Social Icons */}
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="#" className="hover:text-gray-400 transition">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm opacity-70 mt-4">
        &copy; {new Date().getFullYear()} Interview Prep AI. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
