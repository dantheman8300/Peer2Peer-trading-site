

export default function ExchangeCard(
  props: {
    // aptAmount: number,
    // usdAmount: number,
    // isSellingApt: boolean,
  }
){
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow-2xl">
      <div className="stat">
        <div className="stat-title">Offering: </div>
        <div className="stat-value text-success"></div>
        {/* <div className="stat-desc">{props.unit}</div> */}
      </div>
      <div className="stat">
        <div className="stat-title">In exchange for: </div>
        <div className="stat-value text-warning"></div>
        {/* <div className="stat-desc">{props.unit}</div> */}
      </div>
    </div>
  )
}