"use client"

import Tabs from "../components/tabs";
import { DecksProvider } from "../engine";

import AddComponent from "./component";

const AddPage = () => (
  <DecksProvider>
    <Tabs selectedTab="add" />
    <AddComponent />
  </DecksProvider >
)

export default AddPage