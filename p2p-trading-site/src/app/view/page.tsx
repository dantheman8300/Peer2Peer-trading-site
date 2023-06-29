

import { useEffect, useState } from "react";
import Header from "../components/header";
import OfferGrid from "./offerGrid";


export default function page() {

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <OfferGrid />
      </div>
      
    </div>
  )
}