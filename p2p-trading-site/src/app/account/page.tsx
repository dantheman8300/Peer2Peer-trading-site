'use client'

import { useEffect, useState } from "react";
import Header from "../components/header";
import OfferGrid from "../view/offerGrid";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import CreateSection from "./createSection";


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
    <div className="flex flex-col overflow-x-hidden min-h-screen bg-base-300">
      <Header
        title="Aptos P2P Trading"
        useWallet={true}
        wallet={account}
        wallets={wallets}
        connect={connect}
        connected={connected}
        disconnect={disconnect}
      />
      <div className="m-2">
        <CreateSection />
      </div>
      
    </div>
  )
}