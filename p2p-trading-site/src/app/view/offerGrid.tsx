'use client'

import { useEffect, useState } from "react"
import OfferCard from "./offerCard"
import { Network, Provider } from "aptos"

const initialOffers: any[] | (() => any[]) = [
  // {
  //   id: 0,
  //   creator: "0x123",
  //   arbiter: "0x456",
  //   aptAmount: 100,
  //   usdAmount: 100,
  //   counterParty: "0x789",
  //   isCompleted: false,
  //   hasDisputeOpened: false,
  //   isSellingApt: true,    
  // },
  // {
  //   id: 1,
  //   creator: "0x123",
  //   arbiter: "0x456",
  //   aptAmount: 100,
  //   usdAmount: 100,
  //   isCompleted: false,
  //   hasDisputeOpened: false,
  //   isSellingApt: true,    
  // },
  // {
  //   id: 2,
  //   creator: "0x123",
  //   arbiter: "0x456",
  //   aptAmount: 100,
  //   usdAmount: 100,
  //   counterParty: "0x789",
  //   isCompleted: true,
  //   hasDisputeOpened: false,
  //   isSellingApt: false,    
  // },
  // {
  //   id: 3,
  //   creator: "0x123",
  //   arbiter: "0x456",
  //   aptAmount: 100,
  //   usdAmount: 100,
  //   counterParty: "0x789",
  //   isCompleted: false,
  //   hasDisputeOpened: true,
  //   isSellingApt: true,    
  // },
  // {
  //   id: 4,
  //   creator: "0x123",
  //   arbiter: "0x456",
  //   aptAmount: 100,
  //   usdAmount: 100,
  //   isCompleted: false,
  //   hasDisputeOpened: false,
  //   isSellingApt: true,    
  // },
]

export default function OfferGrid(
  props: {
    acceptOnly?: boolean,
    offeringAptOnly?: boolean,
    offeringUsdOnly?: boolean,
  }
) {

  const [offers, setOffers] = useState<any[]>([])

  useEffect(() => {
    getOffers()
  
  }, [])

  const getOffers = async () => {
    const provider = new Provider(Network.DEVNET);

    try {
      const offers = await provider.view(
        {
          function: '0x389af99d6f67670471ca5f0a8e868e562c1af20317189f8eabf5d538f162101f::peer_trading::get_available_offers',
          type_arguments: [],
          arguments: [],
        }
      )

      // console.log('offers', offers)

      const offerCards = (offers[0] as any).data.map((offer: any) => {
        // console.log('offer', offer)
        const offerObject = offer.value
        const offerId = offer.key

        const offerCreator = offerObject.creator
        const offerArbiter = offerObject.arbiter
        const offerAptAmount = offerObject.apt_amount
        const offerUsdAmount = offerObject.usd_amount
        const isSellingApt = offerObject.sell_apt
        const offerCounterParty = offerObject.counterparty.vec[0]
        const isCompletedByCreator = offerObject.completion.creator
        const isCompletedByCounterParty = offerObject.completion.counter_party
        const isDisputeOpened = offerObject.dispute_opened

        return {
          id: offerId,
          creator: offerCreator,
          arbiter: offerArbiter,
          aptAmount: offerAptAmount,
          usdAmount: offerUsdAmount,
          isSellingApt: isSellingApt,
          counterParty: offerCounterParty,
          isCompletedByCreator: isCompletedByCreator,
          isCompletedByCounterParty: isCompletedByCounterParty,
          hasDisputeOpened: isDisputeOpened,
        }

      })



      setOffers(offerCards)

      } catch (error) {
        console.log(error)
      }
  }

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
              isCompletedByCreator={offer.isCompletedByCreator}
              isCompletedByCounterParty={offer.isCompletedByCounterParty}
              hasDisputeOpened={offer.hasDisputeOpened}
              isSellingApt={offer.isSellingApt}
            />
          )
        })
      }
    </div>
  )
}