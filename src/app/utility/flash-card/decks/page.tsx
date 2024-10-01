"use client"

import { DecksProvider } from "../data";
import DecksComponent from "./component";

const DecksPage = () => (
  <DecksProvider>
    <DecksComponent />
  </DecksProvider >
)


export default DecksPage