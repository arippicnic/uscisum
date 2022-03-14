import siteMetadata from "siteMetadata";
import Logo from "@/styles/logo.svg";
import Link from "./Link";
import Footer from "./Footer";
import ThemeSwitch from "./ThemeSwitch";
import { Toast } from "./Toast";

const Layout = ({ children }) => {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <noscript>
          <Toast>{`${siteMetadata.name} require JavaScript.`}</Toast>
        </noscript>
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.name}>
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.name === "string" ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.name}
                  </div>
                ) : (
                  siteMetadata.name
                )}
              </div>
            </Link>
          </div>
          <div className="text-base leading-5">
            <ThemeSwitch />
          </div>
        </header>
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-6xl xl:px-0">
        <div className="flex h-screen flex-col justify-between">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
