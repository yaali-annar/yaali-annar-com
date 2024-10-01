"use client"

import { DecksProvider } from "../data";
import Tabs from "../components/tabs";

import AddComponent from "./component";

const AddPage = () => (
  <DecksProvider>
    <Tabs selectedTab="add" />
    <AddComponent />
  </DecksProvider >
)

export default AddPage