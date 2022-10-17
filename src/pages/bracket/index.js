import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";
import axios from "axios";
import { useIsMobile } from "../../components/header";
import {
    Bracket
  } from "react-tournament-bracket";

// function getWindowDimensions() {
//     const { innerWidth: width, innerHeight: height } = window;
//     return {
//       width,
//       height
//     };
//   }
  
//   function useWindowDimensions() {
//     const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
//     useEffect(() => {
//       function handleResize() {
//         setWindowDimensions(getWindowDimensions());
//       }
  
//       window.addEventListener('resize', handleResize);
//       return () => window.removeEventListener('resize', handleResize);
//     }, []);
  
//     return windowDimensions;
//   }

const TourneyBracket = () => {
    const [loading, setLoading] = useState(true);
    const [bracketData, setBracketData] = useState({});
    // const {width, height} = useWindowDimensions();
    // const finalWidth = Math.max(width - 50, 500);
    // const finalHeight = Math.max(height - 100, 500);
    const isMobile = useIsMobile();
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get('/data/bracket.json');
            setBracketData(data);
            setLoading(false)
        }
        getData();
    }, [])
    if (loading) return <Loading />
    return (
        <>
        <h1 style={{textAlign: "center"}}>2022 Big Ten Championship Bracket</h1>
        <div style={!isMobile ? {
            width: '100%',
            display: "flex",
            justifyContent: "center"
        } : {
            overflow: 'scroll'
        }}>
            <Bracket game={bracketData} />
        </div>
        </>
    )

}
export default TourneyBracket;