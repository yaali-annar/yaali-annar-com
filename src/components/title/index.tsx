"use client"

import NextHead from "next/head";
import type { FC, PropsWithChildren } from "react";


const Title: FC<PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
  return (<>
    <NextHead>
      <title>{children}</title>
    </NextHead>
    <h1>{children}</h1>
  </>)
}

export default Title