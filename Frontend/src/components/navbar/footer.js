import React from 'react'
import facebook from "../images/facebook.png"
import insta from "../images/instagram.png"
import twitter from "../images/twitter.png"
import whatsap from "../images/whatsapp.png"
import logo from "../images/logo-removebg-preview (2).png"
import starBleu from "../images/Blue_star.svg"
import starBlack from "../images/Black_Star.png"
import "../css/footer.css"




export default function footer(){
    return (
      <div id='footer'>
        <div id='lef_footer'>
          <div id='LC'>
            <img src={logo} width={90} alt='' height={45}/>
            <p>contacter-nous /</p>
          </div>
          <div id='lign'></div>
          <div id='media'>
            <img src={facebook} alt='' width={45}/><img alt='' src={whatsap} width={45}/><img src={twitter} height={38}  width={40}/><img src={insta} width={45}/>
          </div>
            
        </div>
        <div id='center_footer'>
          <p style={{textAlign:"center"}}>
          Wheels deal est assujetti à la loi N° 09-08, relative à la protection des personnes physiques à l'égard du traitement des données personnelles et elle a pris ses dispositions pour en respecter la lettre et l'esprit.
          </p>
          <p style={{textAlign:"center"}}>
          © ® Copyright wheels deal Maroc 2023
          </p>
        </div>
        <div id='righ_footer'>
          <p>note :</p><img src={starBleu} alt='' style={{margin:"2%"}} width={20}/><img src={starBleu} style={{margin:"2%"}} width={20}/><img src={starBleu} style={{margin:"2%"}} width={20}/><img src={starBleu} style={{margin:"2%"}} width={20}/><img src={starBlack} style={{margin:"2%"}} width={20}/>
        </div>
      </div>
    )
  }

