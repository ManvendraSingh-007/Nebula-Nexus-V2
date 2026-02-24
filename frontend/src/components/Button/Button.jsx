import './Button.css'
const Button = (props) => {
  return (
    <button className={props.style} type={props.type || ''} >
        {props.value}
    </button>
  )
}

export default Button