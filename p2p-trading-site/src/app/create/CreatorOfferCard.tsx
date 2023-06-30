import { Network, Provider, Types } from "aptos";
import ExchangeCard from "./exchangeCard";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function CreatorOfferCard(
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

  const handleOfferComplete = async () => {
    console.log("Offer accepted", props.id)

    const provider = new Provider(Network.DEVNET);

    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: "0x389af99d6f67670471ca5f0a8e868e562c1af20317189f8eabf5d538f162101f::peer_trading::complete_transaction", // change addr
      type_arguments: [],
      arguments: [props.id], // 1 is in Octas
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

  const handleOfferDispute = async () => {
    console.log("Offer accepted", props.id)

    const provider = new Provider(Network.DEVNET);

    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: "0x389af99d6f67670471ca5f0a8e868e562c1af20317189f8eabf5d538f162101f::peer_trading::open_dispute", // change addr
      type_arguments: [],
      arguments: [props.id], // 1 is in Octas
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

  const handleOfferCancel = async () => {
    console.log("Offer accepted", props.id)

    const provider = new Provider(Network.DEVNET);

    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: "0x389af99d6f67670471ca5f0a8e868e562c1af20317189f8eabf5d538f162101f::peer_trading::cancel_offer", // change addr
      type_arguments: [],
      arguments: [props.id], // 1 is in Octas
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
          <div className="join">
            <button 
              className="btn btn-success join-item" 
              disabled={props.counterParty !== undefined}
              onClick={() => handleOfferComplete()}
            >
              Complete
            </button>
            <button 
              className="btn btn-warning join-item" 
              disabled={props.counterParty !== undefined}
              onClick={() => handleOfferDispute()}
            >
              Dispute
            </button>
            <button 
              className="btn btn-error join-item" 
              disabled={props.counterParty !== undefined}
              onClick={() => handleOfferCancel()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}