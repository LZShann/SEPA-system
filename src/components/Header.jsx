import React from 'react';

const Header = ({ category, title }) => (
  <div className="m-2 md:m-10 mt-5 md:mt-10 p-3 md:p-6">
    <p className="text-2xl text-gray-400">{category}</p>
    <p className="text-5xl font-extrabold tracking-tight text-slate-800">
      {title}
    </p>
  </div>
);

export default Header;