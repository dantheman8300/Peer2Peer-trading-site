'use client'

import { useEffect, useState } from "react";
import Header from "../components/header";
import OfferGrid from "./offerGrid";
import { useWallet } from "@aptos-labs/wallet-adapter-react";


export default function page() {

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
        <OfferGrid />
      </div>
      
    </div>
  )
}