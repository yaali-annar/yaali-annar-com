"use client"

import { useSearchParams } from "next/navigation";
import { DecksProvider } from "../data";
import Tabs from "../components/tabs";

import EditComponent from "./component";

const EditPage = () => (
  <DecksProvider>
    <EditComponent />
  </DecksProvider >
)

export default EditPage