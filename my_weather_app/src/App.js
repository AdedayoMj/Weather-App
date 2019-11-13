import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';


import Weather from './Components/Weather';
import Form from './Components/Form'



//api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key="1e785b2994b56a0d62a512bdc3a77f60"



 class App extends React.Component {
  constructor(){
  super();
  this.state={
    city: undefined,
    continent:undefined,
    icon:undefined,
    main:undefined,
    celsius:undefined,
    temp_max:undefined,
    temp_min:undefined,
    CurrentDate:undefined,
    CurrentTime:undefined,
    wetaherIconsImg: undefined,
    description:'',
    error:false,
    iconTrigger: false
  };

  
  // this.weatherIcon={
  //   Thunderstorm:"wi-thunderstorm",
  //   Drizzle:"wi-sleet",
  //   Rain:"wi-storm-showers",
  //   Snow: "wi-snow",
  //   Atmosphere:"wi-fog",
  //   Clear:"wi-day-sunny",
  //   Clouds:"wi-day-fog",
  // };

  }

calCelsius(temp){
  let cell= Math.floor(temp -273.15) //convert to integer
  return cell;
}

// getWeatherIcon(rangeId){
//   switch(true){
//     case rangeId>=200 && rangeId <=232:
//     this.setState({icon:this.weatherIcon.Thunderstorm});
//     break;

//     case rangeId>=300 && rangeId <=331:
//     this.setState({icon:this.weatherIcon.Drizzle});
//     break;

//     case rangeId>=500 && rangeId <=531:
//     this.setState({icon:this.weatherIcon.Rain});
//     break;

//     case rangeId>=600 && rangeId <=622:
//       this.setState({icon:this.weatherIcon.Snow});
//     break;

//     case rangeId>=701 && rangeId <=781:
//       this.setState({icon:this.weatherIcon.Atmosphere});
//     break;

//     case rangeId===800:
//       this.setState({icon:this.weatherIcon.Clear});
//     break;

//     case rangeId>=801 && rangeId <=804:
//       this.setState({icon:this.weatherIcon.Clouds});
//     break;
    
//     default:
//             this.setState({icon:this.weatherIcon.Clouds});
          
//   }
// }

  getWeather=async (e)=>{

    e.preventDefault();
    const city =e.target.elements.city.value;
    
    const continent=e.target.elements.continent.value


  if (city&&continent){
        //api call
        const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
     const responseTime= await fetch(`http://worldtimeapi.org/api/timezone/${continent}/${city}`);
        //convert to json
        const response =await api_call.json();
        const data=await responseTime.json();

      //convert to datetime
      const timeFormat =data['datetime'].substring(11,19)
      var nDate = data['datetime'].substring(0,10)
      
        console.log(response);
        console.log(data);
     

        
        this.setState({
          city:`${response.name}, ${response.sys.country}`,
          celsius:this.calCelsius(response.main.temp),
          temp_max:this.calCelsius(response.main.temp_max),
          temp_min:this.calCelsius(response.main.temp_min),
          description:response.weather[0].description,
          wetaherIconsImg:response.weather[0].icon,
          CurrentDate:nDate,
          CurrentTime:timeFormat,
         error: false,
         iconTrigger: true
        });
        // this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
  }else{
    this.setState({error:true})
  }


  };


  render() {
   
    return (
     <div className="App">
       <br/>
      <div>
      <Form loadWeather={this.getWeather} error={this.state.error}/>
      </div>
      <br/>
      <div>

      <Weather city={this.state.city}
      temp_celsius={this.state.celsius}
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      description={this.state.description}
      Date={this.state.CurrentDate}
      Time={this.state.CurrentTime}
      iconWe= {this.state.wetaherIconsImg}
      iconTrigger={this.state.iconTrigger}
      />

      </div>
      
    </div>
    )
  }
}

export default App;
