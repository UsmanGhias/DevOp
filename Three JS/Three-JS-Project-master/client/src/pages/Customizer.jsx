import { useState,useEffect } from "react"
import { AnimatePresence,motion } from "framer-motion"
import { useSnapshot } from "valtio"
import config from "../config/config"
import {download} from '../assets'
import {downloadCanvasToImage , reader} from "../config/helpers"
import {EditorTabs , FilterTabs , DecalTypes} from '../config/constants'
import { slideAnimation } from "../config/motion"
import AIpicker from "../components/AIpicker"
import FilePicker from "../components/FilePicker"
import ColorPicker from '../components/ColorPicker'
import Tab from "../components/Tab"
import CustomButton from "../components/CustomButton"
import state from "../store"


const Customizer = () => {

  const snap = useSnapshot(state);

  const [activeEditorTabs , seActiveEditorTabs]=useState("");
  const [File,setFile] =useState("");
  const [Prompt , setPrompt]=useState("");
  const [generatingImg , setGeneratingImg]=useState(false);
  const [activeFilterTabs,setActiveFilterTabs]=useState({
    logoShirt:true,
    stylishShirt:false
  });

  const handleSubmit = async (type) => {
    if (!Prompt) return alert("Please Enter prompt");
  
    try {
      console.log("generating img");
      setGeneratingImg(true);
      const response = await fetch("http://localhost:8082/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Prompt,
        }),
      });
  
      const data = await response.json();
      console.log("Response data:", data); // Add this line to check the response data
  
      if (data.photo) {
        handleDecal(type, `data:image/png;base64,${data.photo}`);
      } else {
        console.error("Invalid image data in the response:", data.photo);
        // You can show an error message here or handle the error as needed
      }
    } catch (error) {
      console.error("Error in API call:", error);
      alert("An error occurred while processing the request.");
    } finally {
      setGeneratingImg(false);
      seActiveEditorTabs("");
    }
  };
  

  const generateTabContent=()=>{
    switch(activeEditorTabs){
      case "colorpicker" :
        return <ColorPicker />;
      case "filepicker" :
        return <FilePicker 
        file={File}
        setfile={setFile}
        readfile={readFile}
        />;
      case "aipicker" :
        return <AIpicker 
        prompt={Prompt}
            setprompt={setPrompt}
            generatingimg={generatingImg}
            handlesubmit={handleSubmit}
        />;
      default:
        return null;

    }
  }
  
  

  const handleDecal=(type,result)=>{
    const decalType = DecalTypes[type];
    state[decalType.stateProperty]=result;

    if(!activeFilterTabs[decalType.filterTab]){
      handleActiveFilterTabs(decalType.filterTab)
    }
  }

  const handleActiveFilterTabs=(tabName)=>{
    switch(tabName){
      case "logoShirt" :
        state.isLogoTexture=!activeFilterTabs[tabName]
        break;
      case "stylishShirt" :
        state.isFullTexture=!activeFilterTabs[tabName]
        break;
      default:
        state.isLogoTexture=true;
        state.isFullTexture=false;
    }
    setActiveFilterTabs((prevState)=>{
      return{
        ...prevState,
        [tabName]:!prevState[tabName]
      }
    })
  }

  const readFile=(type)=>{
    reader(File).then((result)=>{
      handleDecal(type,result)
      seActiveEditorTabs("");
    })
  }

  return (
    <AnimatePresence>
      {!snap.intro &&(
        <>
        <motion.div key='custom' className="absolute top-0 left-0 z-10" {...slideAnimation('left')}>
          <div className="flex items-center min-h-screen">
            <div className="editortabs-container tabs"> 
            {
               EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={()=>{seActiveEditorTabs(tab.name)}} />
                ))
            }
            {generateTabContent()}
            </div>
          </div>
        </motion.div>
        <motion.div className="absolute top-5 right-5 z-10">
          <CustomButton
          type='filled'
          title='Go Back'
          customStyles='w-fit px-5 py-3 font-bold text-md'
          handleClick={()=>state.intro=true}
          />
        </motion.div>
        <motion.div className="filtertabs-container " {...slideAnimation('up')}>
          {
            FilterTabs.map((tab) => (
              <Tab key={tab.name} tab={tab} 
              isFilterTab
              isActiveTab={activeFilterTabs[tab.name]}
              handleClick={()=>{handleActiveFilterTabs(tab.name)}}
              />
            ))
          }
        </motion.div>
        </>
      )

      }
    </AnimatePresence>
  )
}

export default Customizer