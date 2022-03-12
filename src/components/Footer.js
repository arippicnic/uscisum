import Link from "./Link";
import siteMetadata from "siteMetadata";

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href={siteMetadata.authorUrl}>{siteMetadata.author}</Link>
        </div>
      </div>
    </footer>
  );
}
