'use client'

import { useState } from "react"
import OfferCard from "./offerCard"

const initialOffers = [
  {
    creator: "0x123",
    arbiter: "0x456",
    aptAmount: 100,
    usdAmount: 100,
    counterParty: "0x789",
    isCompleted: false,
    hasDisputeOpened: false,
    isSellingApt: true,    
  },
  {
    creator: "0x123",
    arbiter: "0x456",
    aptAmount: 100,
    usdAmount: 100,
    isCompleted: false,
    hasDisputeOpened: false,
    isSellingApt: true,    
  },
  {
    creator: "0x123",
    arbiter: "0x456",
    aptAmount: 100,
    usdAmount: 100,
    counterParty: "0x789",
    isCompleted: true,
    hasDisputeOpened: false,
    isSellingApt: false,    
  },
  {
    creator: "0x123",
    arbiter: "0x456",
    aptAmount: 100,
    usdAmount: 100,
    counterParty: "0x789",
    isCompleted: false,
    hasDisputeOpened: true,
    isSellingApt: true,    
  },
]

export default function OfferGrid(
) {

  const [offers, setOffers] = useState(initialOffers)

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {
        offers.map((offer) => {
          return (
            <OfferCard
              creator={offer.creator}
              arbiter={offer.arbiter}
              aptAmount={offer.aptAmount}
              usdAmount={offer.usdAmount}
              counterParty={offer.counterParty}
              isCompleted={offer.isCompleted}
              hasDisputeOpened={offer.hasDisputeOpened}
              isSellingApt={offer.isSellingApt}
            />
          )
        })
      }
    </div>
  )
}