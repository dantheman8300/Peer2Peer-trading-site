

export default function InputGroup(
  props: {
    topLabel: string, 
    value: number, 
    unit: string
  }
){
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{props.topLabel}</span>
      </label>
      <label className="input-group">
        <input type="text" placeholder={props.value.toLocaleString()} disabled className="input input-bordered" />
        <span>{props.unit}</span>
      </label>
    </div>
  )
}