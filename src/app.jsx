'use strict';
const appRoot = document.getElementById('appRoot');

const personA = {
    name: 'Perico',
    age: 26,
    city: 'Reus'
};
const personB = {
    name: 'Sultana',
    age: 26,
    city: 'Riba Roja d\'Ebre'
};

const personStyle = {
    border: "3px solid blue",
    cursor: "pointer",
}

const handleClick = (persona, name) => {
    switch (name) {
        case 'sumar':
            persona.age += 1;
            break;
        case 'restar':
            persona.age -= 1;
            break;
        case 'reset':
            persona.age = 26;
            break;
        default:
            break;
    }
    render(appRoot);
}

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp_min: 0,
            temp_max: 0,
            temp: 0,
            description: '',
        }
        this.city = {
            lat: '-16.3267',
            lon: '-48.9528',
            name: 'Anápolis',
            country: 'BR',
            flagImg: 'http://openweathermap.org/images/flags/br.png',
        };
    }

    componentDidMount() {
        this.getWeather();
    }

    handleClick() {
        this.getWeather();
    }

    async getWeather() {
        let weatherApiKey = 'f901e95697d96d92d2837b7eed982dd8';
        let res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.city.lat}&lon=${this.city.lon}&appid=${weatherApiKey}&units=metric&lang=es`);
        this.setState({
            temp_min: res.data.main.temp_min,
            temp_max: res.data.main.temp_max,
            temp: res.data.main.temp,
            description: res.data.weather[0].description,
        })
    };

    render() {
        return (
            <div>
                <h3>Tiempo ahora</h3>
                <p>El tiempo en {this.city.name},GO <img src={this.city.flagImg} /> para hoy es de {this.state.temp_min}°C de temperatura minima y {this.state.temp_max}°C de temperatura máxima. </p>
                <p>La temperatura ahora es de {this.state.temp}°C con {this.state.description}.</p>
                <button onClick={() => this.handleClick()}>Update</button>
            </div>
        );
    }
}

const render = (appRoot) => {
    const template = (
        <div>
            <h3 style={personStyle} onClick={() => console.log(personA.name)}>{personA.name}, <span id={personA.name}>{personA.age}</span> de {personA.city}</h3><p>q tal? {personA.name} </p>
            <button onClick={() => handleClick(personA, 'sumar')}>+1</button>
            <button onClick={() => handleClick(personA, 'restar')}>-1</button>
            <button onClick={() => handleClick(personA, 'reset')}>reset</button>
            <h3 style={personStyle} onClick={() => console.log(personB.name)}>{personB.name}, <span id={personB.name}>{personB.age}</span> de {personB.city}</h3><p>q tal? {personB.name} </p>
            <button onClick={() => handleClick(personB, 'sumar')}>+1</button>
            <button onClick={() => handleClick(personB, 'restar')}>-1</button>
            <button onClick={() => handleClick(personB, 'reset')}>reset</button>
            <hr/>
            <Weather />
        </div>
    );

    ReactDOM.render(
        template,
        appRoot
    );
}

render(appRoot);