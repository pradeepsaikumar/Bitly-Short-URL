import "../styles/global.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const onStart = () => {
      document.documentElement.classList.add("page-exit-active");
      document.documentElement.classList.remove("page-enter-active");
      // small timeout to allow exit animation if needed
    };
    const onComplete = () => {
      // add enter classes to body so content animates
      document.documentElement.classList.remove("page-exit-active");
      document.documentElement.classList.add("page-enter-active");
      setTimeout(() => {
        document.documentElement.classList.remove("page-enter-active");
      }, 420);
    };

    router.events.on("routeChangeStart", onStart);
    router.events.on("routeChangeComplete", onComplete);
    router.events.on("routeChangeError", onComplete);

    // initial enter
    document.documentElement.classList.add("page-enter-active");
    const clearInit = setTimeout(() => document.documentElement.classList.remove("page-enter-active"), 420);

    return () => {
      router.events.off("routeChangeStart", onStart);
      router.events.off("routeChangeComplete", onComplete);
      router.events.off("routeChangeError", onComplete);
      clearTimeout(clearInit);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
