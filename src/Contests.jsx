import React from 'react'
import { useState, useEffect } from 'react';
import { styled } from 'styled-components'

function Contests() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    const getData = async() =>{
        try{
            const res = await fetch("https://kontests.net/api/v1/all");
            const allData = await res.json();
            // console.log(allData);
            setData(allData);
            setLoading(false);
        }
        catch(error){}
    }


    
  useEffect(() => {
    // This will run when the component mounts and whenever 'data' changes
    // console.log("data is "+ JSON.stringify(data, undefined, "\t"));
  }, [data]); // The effect depends on 'data' state, so it will be triggered whenever 'data' changes

  useEffect(() => {
    // This will run only when the component mounts
    getData();
  }, []);

  useEffect(() => {
    // Update the currentDateTime state every second to keep it up-to-date
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(interval);
  }, []);


  // Helper function to get the day name from the date
  const getDayName = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  return (
    <>
        <Container>
            <Header>
                <img src="code.png" alt="CodeClocker" />
                <Text>CodeClocker</Text>
            </Header>
            <Time>{getDayName(currentDateTime)} - {currentDateTime.toLocaleTimeString()}</Time>
            <Contest>
                {
                    loading===true ? <strong>Loading data..</strong> : null
                }
                {
                    data && data.map((val, idx, arr)=>{
                        const days = Math.floor(val.duration / (3600 * 24));
                        const hours = Math.floor((val.duration % (3600 * 24)) / 3600);
                        const minutes = Math.floor((val.duration % 3600) / 60);
                        return (
                            <>
                                <Box>
                                  <p>Start Time: {new Date(val.start_time).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                                  <p>End Time: {new Date(val.end_time).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                                  <p>Duration: {days===0 ? null : <>{days} days</>} {hours===0 ? null : <>{hours} hours</>} {minutes===0 ? null : <>{minutes} minutes</>} </p>
                                  <p>Event: <a href={val.url} target="_blank" rel="noopener noreferrer">{val.name}</a></p>
                                  <p>WebSite: {val.site}</p>
                                </Box>
                            </>
                        )
                    })
                }
            </Contest>

            <Footer>
                <strong>Copyrights &copy; 2023 Hariom Kumar</strong>
            </Footer>
            
        </Container>
    </>
  )
}

export default Contests

const Container = styled.div`
    margin: 0 auto;
    text-align: center;
    min-width: 300px;
    min-height: 100vh; /* Ensure the container occupies full viewport height */
  position: relative; /* Establish the container as a relative positioning context */
    overflow-x: hidden;
    display: block;
    top: 0px;
    padding: 0% 0% 3% 0% ;

    &:after{
        background: url("/images/home-background.png") center center / cover
        no-repeat fixed;
        content: "";
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }

    
`
const Header = styled.div`
    display: flex;
    align-items: center;
    background-color: #090b13;
    color: whitesmoke;
    box-shadow: rgba(94, 94, 99, 0.808) 0px 7px 29px 0px;
    
    img{
        padding: 6px 20px;
        width: 45px;
        height: 45px;
    }
`
const Text = styled.div`
    font-family: Shruti;
    font-size: 26px;
    font-weight: bold;
    
`
const Time = styled.div`
    margin-top: 25px;
    font-family: Shruti;
    font-size: 18px;
    margin-right: 10px;
`
const Contest = styled.div`
    width: 90%;
    margin: 7% auto;
    text-align: center;
`
const Box = styled.div`
    color: whitesmoke;
    border: 1px solid #2B2D3B;;
    border-radius: 2px;
    margin-bottom: 8px;
    font-family: Shruti;
    font-size: 16px;

    position: relative;
    overflow-x: hidden;
    display: block;
    
    border: 3px solid rgba(249, 249, 249, 0.1);
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  
    p{
        margin: 0;
        padding: 3px 0;
    }
    a{
        text-decoration: none;
        color: #FF6D00;
    }
    a:hover{
        opacity: 0.7;
    }
    &:after{
        background: url("/images/home-background.png") center center / cover
        no-repeat fixed;
        content: "";
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }

`

const Footer = styled.div`
    font-family: Shruti;
    font-size: 16px;
    padding-bottom:0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    position: relative;
    overflow-x: hidden;
    display: block;
    strong{
        margin-top: 20px;
    }

    &:after{
        background: url("/images/home-background.png") center center / cover
        no-repeat fixed;
        content: "";
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }
    
`