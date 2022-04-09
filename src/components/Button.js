import React from "react";

export default function ({ type, children, auto, className, ...props }) {
  return (
    <>
      <button
        type={type}
        className={`button inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${className} ${
          auto ? "w-auto" : "w-full"
        }`}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
