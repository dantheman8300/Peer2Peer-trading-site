'use client'

import { Network, Provider, Types } from "aptos";
// import ExchangeCard from "./exchangeCard";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import ExchangeCard from "./exchangeCard";
import { useState } from "react";

export default function OfferCard(
  props: {
    // id: number,
    // creator: string, 
    // arbiter: string, 
    // aptAmount: number, 
    // usdAmount: number, 
    // counterParty?: string, 
    // isCompleted: boolean, 
    // hasDisputeOpened: boolean,
    // isSellingApt: boolean, 
  }
) {

  const [isSellingApt, setIsSellingApt] = useState<boolean | undefined>(undefined)
  const [aptAmount, setAptAmount] = useState<number | undefined>(undefined)
  const [usdAmount, setUsdAmount] = useState<number | undefined>(undefined)
  const [arbiter, setArbiter] = useState<string | undefined>(undefined)

  const {
    connect,
    account,
    network,
    connected,
    disconnect,
    wallet,
    wallets,
    signAndSubmitTransaction,
    signTransaction,
    signMessage,
    signMessageAndVerify,
  } = useWallet();

  const handleUnitSelect = (event: any) => {
    console.log(event.target.value)

    // reset amounts to 00 directly with their elements
    const aptAmountElement = document.getElementById("amount1") as HTMLInputElement
    const usdAmountElement = document.getElementById("amount2") as HTMLInputElement
    aptAmountElement.value = "0"
    usdAmountElement.value = "0"
    
    if (event.target.value === "APT") {
      setIsSellingApt(true)
    } else if (event.target.value === "USD") {
      setIsSellingApt(false)
    } else {
      setIsSellingApt(undefined)
    }
  }

  const handleAmountChange = (event: any, selector: number) => {
    console.log(selector)
    console.log(event.target.value)
    const amount = Number(event.target.value)
    if (Number.isNaN(amount)) {
      if (selector === 0) {
        if (isSellingApt) {
          setAptAmount(undefined)
        } else {
          setUsdAmount(undefined)
        }
      } else {
        if (isSellingApt) {
          setUsdAmount(undefined)
        } else {
          setAptAmount(undefined)
        }
      }
    } else {
      if (selector === 0) {
        if (isSellingApt) {
          setAptAmount(amount)
        } else {
          setUsdAmount(amount)
        }
      } else {
        if (isSellingApt) {
          setUsdAmount(amount)
        } else {
          setAptAmount(amount)
        }
      }
    }
  }

  const handleArbiterChange = (event: any) => {
    const arbiter = event.target.value as string

    if (!arbiter.startsWith("0x")) { 
      setArbiter(undefined)
    } else {
      setArbiter(arbiter)
    }
  }

  const handleOfferSubmit = async () => {
    console.log("Offer submitted")
    console.log("isSellingApt", isSellingApt)
    console.log("aptAmount", aptAmount)
    console.log("usdAmount", usdAmount)
    console.log("arbiter", arbiter)

    const provider = new Provider(Network.DEVNET);

    if (!arbiter || !aptAmount || !usdAmount || isSellingApt === undefined) {
      console.log("Missing fields")
      return
    }

    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: "0x389af99d6f67670471ca5f0a8e868e562c1af20317189f8eabf5d538f162101f::peer_trading::create_offer", // change addr
      type_arguments: [],
      arguments: [arbiter, aptAmount * 100000000, usdAmount, isSellingApt], // 1 is in Octas
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      // if you want to wait for transaction
      await provider.waitForTransaction(response?.hash || "");
      console.log(response?.hash)
      window.location.reload()
    } catch (error: any) {
      console.log("error", error);
    }
  }

  return (
    <div className="card card-compact w-fit h-fit bg-base-200 shadow-xl">
      <div className="card-body">

        <h1 className="card-title">
          Create new offer
        </h1>

        <div className="join">
          <span className="btn btn-info join-item">Arbiter</span>
          <div>
            <div>
              <input className="input input-bordered join-item" placeholder="0x..." onChange={(event) => handleArbiterChange(event)}/>
            </div>
          </div>
        </div>

        <div className="join">
          <span className="btn btn-success join-item">Offer</span>
          <div>
            <div>
              <input className="input input-bordered join-item" id="amount1" disabled={isSellingApt == undefined} placeholder="00" onChange={(event) => handleAmountChange(event, 0)}/>
            </div>
          </div>
          <select className="select select-bordered join-item" onChange={(event) => handleUnitSelect(event)}>
            <option disabled selected >UNIT</option>
            <option>APT</option>
            <option>USD</option>
          </select>
        </div>

        <div className="join">
          <span className="btn btn-warning join-item">Request</span>
          <div>
            <div>
              <input className="input input-bordered join-item" id="amount2" disabled={isSellingApt == undefined} placeholder="00" onChange={(event) => handleAmountChange(event, 1)}/>
            </div>
          </div>
          <span className="btn join-item">{isSellingApt == undefined ? "select unit" : isSellingApt ? "USD" : "APT"}</span>
        </div>

        <button 
          className="btn btn-primary" 
          disabled={isSellingApt == undefined || aptAmount == undefined || usdAmount == undefined || arbiter == undefined}
          onClick={() => handleOfferSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
  )
}