import React from 'react'



export default function Weather(props) {
    return (
        <div className="container text-light">
            <div className="Card pt-6">
                <div>
                <h1>{props.city}</h1>
                </div>
                <br/>
                <div>
                  <h4>{props.Date}</h4> 
                  <br/>
                  <h4>{props.Time}</h4> 
                </div>
                <br/>
                <div>
                    {props.iconTrigger ? (
                        <h5 className="py-4">
                        <img  className="resizeImage" src={`http://openweathermap.org/img/w/${props.iconWe}.png`} />
                        </h5>
                    ):null

                    } 
               
                </div>
                <br/><br/>
                <div>
                {props.temp_celsius ? (<h1 className="py-1">{props.temp_celsius}&deg;</h1>):null}
                <br/><br/>
                {/* show max and min temp */}
                {MinMaxTemp(props.temp_min, props.temp_max)}
                </div>
                <br/><br/>
                
                <div>
                <h4 className="py-3">{props.description}</h4>
                </div>
               
               
                
                
            </div>
        </div>
    )
}

function MinMaxTemp(min, max){
    if (min&&max){
    return(
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h3>
    )
}
}
