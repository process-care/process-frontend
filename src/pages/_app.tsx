"use client";

import "../styles.css";
import type { AppProps } from "next/app";

import reportWebVitals from "../reportWebVitals";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

reportWebVitals();
