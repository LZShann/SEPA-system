import React from 'react';

const Header = ({ category, title }) => (
  <div className="m-2 md:m-2 p-2 md:p-2">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
  </div>
);

export default Header;