import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'

const Tab = ({tab , isActiveTab,isFilterTab,handleClick}) => {

  const snap = useSnapshot(state);
  const activeStles = isFilterTab && isActiveTab ? {backgroundColor:snap.color , opacity:0.5}:{backgroundColor:"transparent" , opacity:1} ;

  return (
    <div 
    key={tab.name}
    className={`tab-btn ${isFilterTab ? 'rounded-full':'glassmorphism'}`}
    onClick={handleClick}
    style={activeStles}
    >
      <img src={tab.icon} alt="icon" /> 
    </div>
  )
}

export default Tab