import state from '../store'
import { useSnapshot } from 'valtio'
import { getContrastingColor } from '../config/helpers'

const CustomButton = ({type , title , handleClick,customStyles}) => {

    const snap = useSnapshot(state);

    const generateStyle = (type) => {
    if(type === 'filled'){
        return {
            backgroundColor:'#EFBD48' ,
            color: getContrastingColor(snap.color)
            
        }
    }   
    else if(type==='outline'){
      return{
      borderWidth:'1px',
      borderColor:snap.color,
      color:getContrastingColor(snap.color),
      backgroundColor: 'transparent'
      }
    }
    }

  return (
    <button className={`px-2 py-1.5 rounded-md ${customStyles} `} onClick={handleClick} style={generateStyle(type)}>
        {title}
    </button>
  )
}

export default CustomButton