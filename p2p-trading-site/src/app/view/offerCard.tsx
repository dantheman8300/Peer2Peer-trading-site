import ExchangeCard from "./exchangeCard";

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

  const handleOfferAccept = () => {
    console.log("Offer accepted", props.id)
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