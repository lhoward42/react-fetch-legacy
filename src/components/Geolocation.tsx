import React, { Component } from 'react';

type GeolocationState = {
    loaded: boolean,
    lat: number,
    long: number,
    temp: number,
    maxTemp: number,
    minTemp: number,
    humidity: number, 
    description: string
}



class Geolocation extends Component<{},GeolocationState> {
    constructor(props: {}){
        super(props);
        this.state = {
            lat: 0,
            long: 0,
            loaded: false,
            temp: 0,
            maxTemp: 0,
            minTemp: 0,
            humidity: 0,
            description: ''
        }
    }

    callGeo = (): void => {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude,
                loaded: true
            })       
        })
        this.fetchWeather()
    }

    componentDidMount() {
      this.callGeo()
      
      console.log('comp mounting')
    }

    componentDidUpdate() {
        console.log('update')
    }

// ADD FETCH WEATHER FUNCTION THAT REACHES OUT TO THE API
     fetchWeather = async() => {
        
        let APIKEY = 'b7bd8014245284ce125d6de5bde9b301';
        let { lat, long } = this.state
        try {
        let res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${APIKEY}`, {
            method: 'GET'
        })
        let weather = await res.json();

        console.log(weather);
        
        this.setState({
            temp: Math.round(weather.main.temp),
            maxTemp: Math.round(weather.main.temp_max),
            minTemp: Math.round(weather.main.temp_min),
            humidity: Math.round(weather.main.humidity),
            description: weather.weather[0].description
        })
    } catch (err) {
        console.log(err);
        
    }
    }


    render (){
        const { temp, maxTemp, minTemp, humidity, description } = this.state
        return (
            <div>
            
        The average temperature today is {`${temp}\u00B0F`} and it is currently {description} outside<br/>
        High: {`${maxTemp}\u00B0F`} <br/>
        Low: {`${minTemp}\u00B0F`}<br/>
        Humidity: {`${humidity}\u00B0F`}<br/>
        
            </div>
        )
    }
}

export default Geolocation