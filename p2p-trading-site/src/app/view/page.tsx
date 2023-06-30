'use client'

import { useEffect, useState } from "react";
import Header from "../components/header";
import OfferGrid from "./offerGrid";
import { useWallet } from "@aptos-labs/wallet-adapter-react";


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
    <div className="min-h-screen flex flex-col bg-base-300">
      <Header
        title="Aptos P2P Trading"
        useWallet={true}
        wallet={account}
        wallets={wallets}
        connect={connect}
        connected={connected}
        disconnect={disconnect}
      />
      <div className="grow">
        <OfferGrid />
      </div>
    </div>
  )
}