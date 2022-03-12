import React from "react";
import { useRouter } from "next/router";
import timestampTxt from "@/utils/formatDate";
import styles from "@/styles/Main.module.css";

export default ({ title, body, createdAt }) => {
  const pathName = useRouter().pathname === "/";
  const splitData = (e) => {
    const sub = e.substring(0, e.indexOf("#br", e.indexOf("#br") + 1));
    if (sub && pathName) {
      return sub;
    }
    return e;
  };
  const htmlRender = (e) => {
    const renderData = splitData(e)
      .replace(/#br/g, "<br/>")
      .replace(/[~]/g, `<span class=${styles.contentColor}>`)
      .replace(/[+]/g, `</span>`);
    return (
      <div
        className={styles.wrap}
        dangerouslySetInnerHTML={{ __html: renderData }}
      ></div>
    );
  };
  return (
    <article
      className={`articel-card text-center space-y-2 xl:items-baseline xl:space-y-0 mt-10 p-4 ${
        pathName ? "" : "py-10"
      }`}
    >
      <div className="space-y-3 xl:col-span-3">
        <div className={pathName ? "mb-5" : "mb-10"}>
          <h1 className={`text-2xl ${pathName ? "" : "lg:text-3xl"}`}>
            {title}
          </h1>
          <div className="text-gray-400 text-sm mt-1">
            {timestampTxt(createdAt)}
          </div>
        </div>
        <div className="text-base xl:text-lg">{htmlRender(body)}</div>
      </div>
    </article>
  );
};
