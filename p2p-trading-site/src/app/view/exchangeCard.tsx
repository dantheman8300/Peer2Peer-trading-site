

export default function ExchangeCard(
  props: {
    aptAmount: number,
    usdAmount: number,
    isSellingApt: boolean,
  }
){
  return (
    <div className="stats stats-vertical shadow-2xl overflow-x-hidden w-fit">
      <div className="stat">
        <div className="stat-title">Offering: </div>
        <div className="stat-value text-success text-center">{props.isSellingApt ? (props.aptAmount / 100000000).toLocaleString(undefined, {minimumFractionDigits: 8}) : props.usdAmount.toLocaleString(undefined, {minimumFractionDigits: 2})} {props.isSellingApt ? "APT" : "USD"}</div>
        {/* <div className="stat-desc">{props.unit}</div> */}
      </div>
      <div className="stat">
        <div className="stat-title">In exchange for: </div>
        <div className="stat-value text-warning text-center">{props.isSellingApt ? props.usdAmount.toLocaleString(undefined, {minimumFractionDigits: 2}) : (props.aptAmount / 100000000).toLocaleString(undefined, {minimumFractionDigits: 8})} {props.isSellingApt ? "USD" : "APT"}</div>
        {/* <div className="stat-desc">{props.unit}</div> */}
      </div>
    </div>
  )
}