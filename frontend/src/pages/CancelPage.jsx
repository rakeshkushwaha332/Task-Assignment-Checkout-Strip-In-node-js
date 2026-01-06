import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function CancelPage() {
    const navigate = useNavigate();
   const handleBack = () => {
    navigate("/");
  }
  return  (<>
  
    <div style={{width:"50%",height:"50vh", margin:"auto", textAlign:"center" , padding:"20px"}}>
            <span onClick={handleBack} style={{ textDecoration: "none", color: "blue" ,cursor:"pointer"}}><h5><FaArrowLeft color="blue" /> Back </h5></span>
      
      <h1 style={{color:"red", fontSize:"50px"}}>Payment Cancel..!</h1>
      <p style={{fontSize:"20px"}}>Try again... </p>
    </div>
  
  
  </>);
}

export default CancelPage;
