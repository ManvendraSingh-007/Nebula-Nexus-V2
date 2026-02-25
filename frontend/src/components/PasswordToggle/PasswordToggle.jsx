import './PasswordToggle.css'

const PasswordToggle = (props) => {
  const { value, onClick } = props;
  return (
    <div className='toggleDiv' onClick={onClick}>
        {value}
    </div>
  )
}

export default PasswordToggle