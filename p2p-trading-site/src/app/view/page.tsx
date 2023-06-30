'use client'

import { useEffect, useState } from "react";
import Header from "../components/header";
import OfferGrid from "./offerGrid";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import ViewHero from "./viewHero";


export default function page() {

  const [acceptOnly, setAcceptOnly] = useState(false);
  const [offeringApt, setOfferingApt] = useState(false);
  const [offeringUsd, setOfferingUsd] = useState(false);


  const {
    connect,
    connected,
    disconnect,
    account,
    wallets,
    signAndSubmitTransaction,
  } = useWallet();

  return (
    <div className="h-screen flex flex-col">
      <Header
        title="Aptos P2P Trading"
        useWallet={true}
        wallet={account}
        wallets={wallets}
        connect={connect}
        connected={connected}
        disconnect={disconnect}
      />
      <div className="">
        <ViewHero 
          setAcceptOnly={setAcceptOnly}
          acceptOnly={acceptOnly}
          setOfferingApt={setOfferingApt}
          offeringApt={offeringApt}
          setOfferingUsd={setOfferingUsd}
          offeringUsd={offeringUsd}
        />
        <OfferGrid 
          acceptOnly={acceptOnly}
          offeringAptOnly={offeringApt}
          offeringUsdOnly={offeringUsd}
        />
      </div>
      
    </div>
  )
}