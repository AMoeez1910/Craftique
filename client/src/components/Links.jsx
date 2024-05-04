import React from 'react'

const Links = ({hrefs}) => {
  return (
    <>
      {hrefs.map((href, index) => (
        <li className="nav-item" key={index}>
          <a className="nav-link" href={href.href}>
            {href.name}
          </a>
        </li>
      ))}
    </>
  );
}

export default Links
