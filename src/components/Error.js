import Link from "@/components/Link";

import { SEO } from "@/components/SEO";

function Error({ code, error }) {
  return (
    <>
      <SEO title={code} description={error} />
      <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
        <div className="space-x-2 pt-6 pb-8">
          <h1 className="text-5xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:leading-14">
            {code}
          </h1>
        </div>
        <div className="max-w-md">
          <p className="mb-2">{error}</p>
          <Link href="/">
            <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Error;
