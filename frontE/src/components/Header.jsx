import React from 'react';

const Header = () => {
  return (
    <header className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Welcome <a href="https://www.tkobro.co/" target="_blank" className="hover:underline">To</a> WFT Platform.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6">Home</a>
          </li>
          <li>
            <a href="/showcase" className="mr-4 hover:underline md:mr-6">Showcase</a>
          </li>
          <li>
            <a href="/create-post" className="mr-4 hover:underline md:mr-6">Generate</a>
          </li>
          <li>
            <a href="/texts-input" className="hover:underline">Test 1</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
