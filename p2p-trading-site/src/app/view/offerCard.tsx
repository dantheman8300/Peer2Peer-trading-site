import InputGroup from "../components/inputGroup";


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
    <div className="card w-96 h-fit bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Offer</h2>
        <InputGroup
          topLabel="Offering"
          value={props.isSellingApt ? props.aptAmount : props.usdAmount}
          unit={props.isSellingApt ? "APT" : "USD"}
        />
        <InputGroup
          topLabel="In exchange for"
          value={props.isSellingApt ? props.usdAmount : props.aptAmount}
          unit={props.isSellingApt ? "USD" : "APT"}
        />
        <label htmlFor="my_modal_6" className={`btn btn-primary` + (props.counterParty ? '' : 'btn-disabled')} >Accept</label>
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
        <div className="card-actions justify-end">
          {props.isCompleted && <div className="badge badge-success">Complete</div>}
          {props.counterParty && <div className="badge badge-outline">Accepted</div>}
          {!props.counterParty && !props.isCompleted && <div className="badge badge-outline">Open</div>}
        </div>
      </div>
    </div>
  )
}