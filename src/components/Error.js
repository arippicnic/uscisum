import Link from "@/components/Link";

import SEO from "@/components/SEO";
import Button from "@/components/Button";

function Error({ code, error }) {
  return (
    <>
      <SEO title={code} description={error} />
      <div className="grid place-items-center mt-20">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-extrabold">{code}</h1>
          <p className="mb-5">{error}</p>
          <Link href="/">
            <Button auto={true} className="bg-indigo-700">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Error;
