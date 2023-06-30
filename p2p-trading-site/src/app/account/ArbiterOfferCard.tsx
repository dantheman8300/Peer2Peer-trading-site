import { Network, Provider, Types } from "aptos";
import ExchangeCard from "./exchangeCard";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";

export default function ArbiterOfferCard(
  props: {
    id: string,
    creator: string, 
    arbiter: string, 
    aptAmount: number, 
    usdAmount: number, 
    counterParty?: string, 
    isCompletedByCreator: boolean, 
    isCompletedByCounterParty: boolean,
    hasDisputeOpened: boolean,
    isSellingApt: boolean, 
  }
) {

  const [terminateChoice, setTerminateChoice] = useState<boolean | undefined>(undefined);
  const [refundChoice, setRefundChoice] = useState<boolean | undefined>(undefined);

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

  const handleOfferResolveDispute = async () => {
    console.log("Offer accepted", props.id)

    const provider = new Provider(Network.DEVNET);

    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: "0x389af99d6f67670471ca5f0a8e868e562c1af20317189f8eabf5d538f162101f::peer_trading::resolve_dispute", // change addr
      type_arguments: [],
      arguments: [props.id, terminateChoice, refundChoice], // 1 is in Octas
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

  const handleTerminateChoice = (event: any) => {
    if (event.target.value === "Terminate") {
      setTerminateChoice(true)
    } else if (event.target.value === "Don't terminate") {
      setTerminateChoice(false)
    } else {
      setTerminateChoice(undefined)
    }
  }

  const handleRefundChoice = (event: any) => {
    if (event.target.value === "Refund creator") {
      setRefundChoice(true)
    } else if (event.target.value === "Don't refund creator") {
      setRefundChoice(false)
    } else {
      setRefundChoice(undefined)
    }
  }

  return (
    <div className="card card-compact w-fit h-fit bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          {props.isCompletedByCreator && <div className="badge badge-info">Completed By Creator</div>}
          {props.isCompletedByCounterParty && <div className="badge badge-info">Completed By Counter Party</div>}
          {props.counterParty && <div className="badge badge-success">Accepted</div>}
          {!props.counterParty && <div className="badge badge-warning">Open</div>}
          {props.hasDisputeOpened && <div className="badge badge-error">Disputed</div>}
        </div>
        <ExchangeCard
          aptAmount={props.aptAmount}
          usdAmount={props.usdAmount}
          isSellingApt={props.isSellingApt}
        />
        <div className="card-actions justify-center">
          <div className="join join-vertical">
            <div className="join join-item">
              <select className="select select-bordered join-item" onChange={(event) => handleTerminateChoice(event)}>
                <option disabled selected >Terminate?</option>
                <option>Terminate</option>
                <option>Don't terminate</option>
              </select>
              <select className="select select-bordered join-item" onChange={(event) => handleRefundChoice(event)}>
                <option disabled selected >Refund creator?</option>
                <option>Refund creator</option>
                <option>Don't refund creator</option>
              </select>
            </div>
            <button 
              className="btn btn-success join-item" 
              disabled={!props.hasDisputeOpened || terminateChoice === undefined || refundChoice === undefined}
              onClick={() => handleOfferResolveDispute()}
            >
              Resolve Dispute
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}