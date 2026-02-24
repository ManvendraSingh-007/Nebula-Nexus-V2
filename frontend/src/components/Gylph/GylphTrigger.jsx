import './GylphTrigger.css'

const GylphTrigger = (props) => {
  const { type, onClick, value } = props;
  return (
    <div className='gylphDiv'>
        <button type={type || 'button'} className='glyphTrigger' onClick={onClick}>{value || "-> Show Coordinate"}</button>
    </div>
  )
}

export default GylphTrigger