'use client'

import { useEffect, useState } from "react"
import OfferCard from "./offerCard"
import { Network, Provider } from "aptos"

const initialOffers = [
  {
    id: 0,
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
    id: 1,
    creator: "0x123",
    arbiter: "0x456",
    aptAmount: 100,
    usdAmount: 100,
    isCompleted: false,
    hasDisputeOpened: false,
    isSellingApt: true,    
  },
  {
    id: 2,
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
    id: 3,
    creator: "0x123",
    arbiter: "0x456",
    aptAmount: 100,
    usdAmount: 100,
    counterParty: "0x789",
    isCompleted: false,
    hasDisputeOpened: true,
    isSellingApt: true,    
  },
  {
    id: 4,
    creator: "0x123",
    arbiter: "0x456",
    aptAmount: 100,
    usdAmount: 100,
    isCompleted: false,
    hasDisputeOpened: false,
    isSellingApt: true,    
  },
]

export default function OfferGrid() {

  const [offers, setOffers] = useState(initialOffers)

  useEffect(() => {
    const provider = new Provider(Network.DEVNET);
  
  }, [])

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {
        offers.map((offer) => {
          return (
            <OfferCard
              id={offer.id}
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