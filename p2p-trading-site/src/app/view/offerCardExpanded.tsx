import ExchangeCard from "./exchangeCard";


export default function OfferCardExpanded(
  props: {
    id: number,
    creator: string,
    arbiter: string,
    aptAmount: number,
    usdAmount: number,
    isSellingApt: boolean,
  }
) { 
  return (
    <div className="card w-fit h-fit bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
        </div>
        <ExchangeCard
          aptAmount={props.aptAmount}
          usdAmount={props.usdAmount}
          isSellingApt={props.isSellingApt}
        />
      </div>
    </div>
  )
}