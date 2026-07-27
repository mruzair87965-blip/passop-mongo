import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-5">

        {/* Logo */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">
            <span className="text-green-500">&lt;</span>
            Pass<span className="text-green-500">Op</span>
            <span className="text-green-500"> /&gt;</span>
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Securely manage your passwords with PassOp.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-gray-300 text-sm sm:text-base">
          <a
            href="#"
            className="hover:text-green-400 transition duration-300"
          >
            Home
          </a>

          <a
            href="#"
            className="hover:text-green-400 transition duration-300"
          >
            About
          </a>

          <a
            href="#"
            className="hover:text-green-400 transition duration-300"
          >
            Contact
          </a>

          <a
            href="https://github.com/"
            target="_blank"
            className="hover:text-green-400 transition duration-300"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-xs sm:text-sm px-4">
        © {new Date().getFullYear()} PassOp. Made with ❤️ by Uzair.
      </div>
    </footer>
  );
};
export default Footer
