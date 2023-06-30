import { Network, Provider, Types } from "aptos";
import ExchangeCard from "./exchangeCard";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function OfferCard(
  props: {
    id: number,
    creator: string, 
    arbiter: string, 
    aptAmount: number, 
    usdAmount: number, 
    counterParty?: string, 
    isCompleted: boolean, 
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

  const handleOfferAccept = async () => {
    console.log("Offer accepted", props.id)

    const provider = new Provider(Network.DEVNET);

    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: "0x1::peer_trading::accept_offer", // change addr
      type_arguments: [],
      arguments: [props.id], // 1 is in Octas
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      // if you want to wait for transaction
      await provider.waitForTransaction(response?.hash || "");
      console.log(response?.hash)
    } catch (error: any) {
      console.log("error", error);
    }
  }

  return (
    <div className="card card-compact w-fit h-fit bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          {props.isCompleted && <div className="badge badge-info">Completed</div>}
          {props.counterParty && <div className="badge badge-success">Accepted</div>}
          {!props.counterParty && !props.isCompleted && <div className="badge badge-warning">Open</div>}
          {props.hasDisputeOpened && <div className="badge badge-error">Disputed</div>}
        </div>
        <ExchangeCard
          aptAmount={props.aptAmount}
          usdAmount={props.usdAmount}
          isSellingApt={props.isSellingApt}
        />
        <button 
          className="btn btn-primary" 
          disabled={props.counterParty !== undefined}
          onClick={() => handleOfferAccept()}
        >Accept</button>
      </div>
    </div>
  )
}