
      import React from 'react';
      import { renderToStaticMarkup } from 'react-dom/server';

      import React from "react";

export default function new_page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">new_page</h1>
      <p>Okay this is working</p>
    </div>
  );
}


      const html = renderToStaticMarkup(React.createElement(new_page));
      console.log(html);
    