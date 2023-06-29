import ExchangeCard from "../components/exchangeCard";


export default function OfferCard(
  props: {
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

  return (
    <div className="card card-compact w-fit h-fit bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          {props.isCompleted && <div className="badge badge-success">Completed</div>}
          {props.counterParty && <div className="badge badge-success">Accepted</div>}
          {!props.counterParty && !props.isCompleted && <div className="badge badge-warning">Open</div>}
          {props.hasDisputeOpened && <div className="badge badge-error">Disputed</div>}
        </div>
        <div className="flex">
          <ExchangeCard
            aptAmount={props.aptAmount}
            usdAmount={props.usdAmount}
            isSellingApt={props.isSellingApt}
          />
        </div>
        {
          !props.counterParty &&
          <label htmlFor="my_modal_6" className="btn btn-primary ">Accept</label>
        }
        {
          props.counterParty &&
          <button className="btn btn-primary btn-disabled">Accept</button>
        }
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="card-actions justify-end">
                <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
              </div>
              <p>We are using cookies for no reason.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}