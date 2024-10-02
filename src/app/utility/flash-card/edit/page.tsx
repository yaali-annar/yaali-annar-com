"use client"

import { Suspense } from 'react'
import { DecksProvider } from "../engine";

import EditComponent from "./component";

const EditPage = () => (
  <DecksProvider>
    <Suspense>
      <EditComponent />
    </Suspense>
  </DecksProvider >
)

export default EditPage