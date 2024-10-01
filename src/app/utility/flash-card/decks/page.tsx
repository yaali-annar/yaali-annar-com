"use client"

import { Suspense } from 'react'

import { DecksProvider } from "../data";
import DecksComponent from "./component";

const DecksPage = () => (
  <DecksProvider>
    <Suspense>
      <DecksComponent />
    </Suspense>
  </DecksProvider >
)


export default DecksPage