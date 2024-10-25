import Script from 'next/script'
import { useEffect } from 'react'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const style = document.getElementById('non-critical-css') as HTMLLinkElement
    if (style) {
      style.media = 'all'
    }
  }, [])

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script strategy="lazyOnload" id="ga-script">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
      <style jsx global>{`
        /* Critical CSS here */
        body { font-family: sans-serif; }
      `}</style>
      <link
        rel="stylesheet"
        href="/non-critical.css"
        media="print"
        onLoad={() => {
          const style = document.getElementById('non-critical-css') as HTMLLinkElement;
          if (style) style.media = 'all';
        }}
        id="non-critical-css"
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
