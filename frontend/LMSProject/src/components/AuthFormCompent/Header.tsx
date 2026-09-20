// import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl?: string;
}

function Header({ heading, paragraph, linkName, linkUrl = "#" }: HeaderProps) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img
          alt=""
          className="h-14 w-14 text-2xl font-bold text-purple-600"
          src="./src/assets/projectAssests/favicon/chat.png"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(25%) sepia(80%) saturate(3000%) hue-rotate(250deg)",
          }}
        />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="text-center text-sm text-gray-600 mt-5">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}

export default Header;
