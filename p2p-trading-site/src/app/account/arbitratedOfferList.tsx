'use client'

import { useEffect, useState } from "react"
import OfferCard from "./CreatorOfferCard"
import { Network, Provider } from "aptos"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import ArbiterOfferCard from "./ArbiterOfferCard"

export default function ArbiterOfferList() {

  const {
    connect,
    connected,
    disconnect,
    account,
    wallets,
    signAndSubmitTransaction,
  } = useWallet();

  const [offers, setOffers] = useState<any[]>([])

  useEffect(() => {
    getOffers()
  
  }, [account])

  const getOffers = async () => {
    const provider = new Provider(Network.DEVNET);

    if (!connected) {
      console.log('not connected')
      return
    }

    if (account === null) {
      console.log('account is null')
      return
    }

    try {
      const offers = await provider.view(
        {
          function: '0x389af99d6f67670471ca5f0a8e868e562c1af20317189f8eabf5d538f162101f::peer_trading::get_available_offers',
          type_arguments: [],
          arguments: [],
        }
      )

      // console.log('offers', offers)

      let offerCards = (offers[0] as any).data.map((offer: any) => {
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

      offerCards = offerCards.filter((offer: any) => {
        return offer.arbiter === account.address
      })

      setOffers(offerCards.reverse())

      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold m-2 text-secondary">Your arbiter offers</h1>
      {
        offers.length === 0 &&
        <p className="text-xl">You are not an arbiter for any offers</p>
      }
      {
        offers.length > 0 &&
        <div className="carousel carousel-vertical carousel-center h-96 p-4 items-center bg-neutral rounded-box">
        {

          offers.map((offer) => {
            return (
              <div className="carousel-item m-2">
                <ArbiterOfferCard
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
              </div>
            )
          })
        }
        </div>
      }
    </div>
  )
}