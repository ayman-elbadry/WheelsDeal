import React from 'react'
import "../css/midle.css"
export default function Midle() {
return (
    <div id='G_Content'>
        <div id='T_Content'>
            <div id='titre'>
            <div style={{display:"inline"}}>Votre <span style={{color:"#1C6BBD" , display:"inline"}}>C</span>onfort est Notre <span style={{color:"#1C6BBD", display:"inline"}}>P</span>riorité</div>
            <button id='B_t' style={{width:"400px" ,height:"70px"}}>Votre voiture est là</button>
            </div>
        </div>
        <div id='B_Content'>
            <p style={{fontFamily:"michroma",fontSize:"30px"}}>nos services</p>
            <div id='service'>
                <div class='ser_E'>
                    <div class='ser_V'>

                    </div>
                    <p class="ser_P">
                    Louer des voitures avec des prix raisonnable
                    </p>
                </div>
                <div class='ser_E'>
                    <div class="ser_V">

                    </div>
                    <p class="ser_P">
                    Vendre des voitures d'occasion avec des prix compétitives
                    </p>
                </div>
                <div class="ser_E">
                    <div id='ser_S'>

                    </div>
                    <p class="ser_P">
                    Des assistants en votre service 24/24 h pour vous conseillez 
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
