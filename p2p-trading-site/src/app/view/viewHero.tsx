'use client'

export default function ViewHero(
  props: {
    setAcceptOnly: any,
    acceptOnly: boolean,
    setOfferingApt: any,
    offeringApt: boolean,
    setOfferingUsd: any,
    offeringUsd: boolean,
  }
) {
  return (
    <ul className="menu bg-base-200 w-56 rounded-box">
      <li >
        <div className="form-control" onClick={() => props.setAcceptOnly(!props.acceptOnly)}>
          <label className="label cursor-pointer" >
            <span className="label-text">Open offers only</span> 
            <input type="checkbox" checked={props.acceptOnly} className="checkbox" />
          </label>
        </div>  
      </li>
      <li>
        <div className="form-control">
          <label className="label cursor-pointer" onClick={() => props.setAcceptOnly(!props.acceptOnly)}>
            <span className="label-text">Offering APT</span> 
            <input type="checkbox" checked={props.acceptOnly} className="checkbox" />
          </label>
        </div>  
      </li>
      <li>
        <div className="form-control">
          <label className="label cursor-pointer" onClick={() => props.setAcceptOnly(!props.acceptOnly)}>
            <span className="label-text">Offering USD</span> 
            <input type="checkbox" checked={props.acceptOnly} className="checkbox" />
          </label>
        </div>  
      </li>
    </ul>
  )
}