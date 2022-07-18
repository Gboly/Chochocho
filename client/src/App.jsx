import "./app.css"
import Home from "./pages/home-sm/Home"
import HomeMd from "./pages/home-md/Home-md"
import HomeLg from "./pages/home-lg/Home-lg"
import Profile from "./pages/profile/Profile"
import ProfileMd from "./pages/profile-md/Profile-md"
import ProfileLg from "./pages/profile-lg/Profile-lg"
import { useEffect, useState, useCallback } from "react"
import {Routes, Route} from "react-router-dom"


export default function App() {
  const [mdMqy, setMdMqy] = useState(false)
  const [lgMqy, setLgMqy] = useState(false)
  
    const handleMdMqy = useCallback((e)=>{      
        setMdMqy(e.matches)
    },[])
    
    const handleLgMqy = useCallback((e)=>{      
      setLgMqy(e.matches)
  },[])

    useEffect(()=>{
        const mediaQuery = window.matchMedia("(min-width: 701px)");      
        handleMdMqy(mediaQuery);
        mediaQuery.addEventListener("change", handleMdMqy)      
    },[handleMdMqy])

    useEffect(()=>{
      const mediaQuery = window.matchMedia("(min-width: 1100px)");      
      handleLgMqy(mediaQuery);
      mediaQuery.addEventListener("change", handleLgMqy)      
  },[handleLgMqy])


  return (
    <Routes>
      <Route path="/" element={
        <div className="pages-container">
          {lgMqy ? <HomeLg /> : mdMqy ? <HomeMd /> : <Home />}
        </div>
      } />
      <Route path="/profile" element={
        <div className="pages-container">
          {lgMqy ? <ProfileLg /> : mdMqy ? <ProfileMd /> : <Profile />}
        </div>
      } />
    </Routes>
    
  )
}

  // const [mqy, setMqy] = useState("sm")
  // const [mqy701px, setMqy701px] = useState(false)

  // const handleMqy = useCallback((e)=>{
  //   const breakPoint = e.media
  //   if (e.matches && e.media.includes("1100px")){
  //     console.log(breakPoint)
  //     setMqy("lg")
  //   }
  //   else if (e.matches && e.media.includes("701px")) {
  //     setMqy("md")
  //     setMqy701px(true)
  //     console.log(e)
  //   }
  //   else{
  //     if(!mqy701px){
  //      setMqy("sm")
  //     }
  //     else{
  //       setMqy("md")
  //       setMqy701px(false)}
  //   }
  // },[mqy701px])

  // useEffect(()=>{
  //   const mediaQueries = [
  //     window.matchMedia("(min-width: 701px)"),
  //     window.matchMedia("(min-width: 1100px)")
  //   ]
  //   mediaQueries.forEach((mediaQuery)=>{
  //     handleMqy(mediaQuery);
  //   mediaQuery.addEventListener("change", handleMqy)

  //   return ()=> mediaQuery.removeEventListener("change", handleMqy)
  //   })
    
    
  // }, [handleMqy])