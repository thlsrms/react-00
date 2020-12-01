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
    marginTop: "10px",
    paddingLeft: "5px",
    paddingBottom: "5px",
}

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            age: props.age,
            city: props.city,
            defaultAge: 0,
        }
    }

    componentDidMount() {
        this.setState({ defaultAge: this.state.age });
    }

    handleClick(func) {
        switch (func) {
            case 'sumar':
                this.setState({ age: this.state.age + 1 })
                break;
            case 'restar':
                this.setState({ age: this.state.age - 1 })
                break;
            case 'reset':
                this.setState({ age: this.state.defaultAge })
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div style={personStyle}>
                <h3>{this.state.name}, <span id={this.state.name}>{this.state.age}</span> de {this.state.city}</h3><p>q tal? {this.state.name} </p>
                <button onClick={() => this.handleClick('sumar')}>+1</button>
                <button onClick={() => this.handleClick('restar')}>-1</button>
                <button onClick={() => this.handleClick('reset')}>reset</button>
            </div>
        )
    }
}


const weatherStyle = {
    border: "2px dotted green",
    padding: "10px",
    margin: "5px",
}

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp_min: 0,
            temp_max: 0,
            temp: 0,
            description: '',
            country: ''
        }
    }

    componentDidMount() {
        this.getWeather();
    }

    handleClick() {
        this.getWeather();
    }

    async getWeather() {
        let weatherApiKey = 'f901e95697d96d92d2837b7eed982dd8';
        let res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.props.cityName}&appid=${weatherApiKey}&units=metric&lang=es`);
        this.setState({
            temp_min: res.data.main.temp_min,
            temp_max: res.data.main.temp_max,
            temp: res.data.main.temp,
            description: res.data.weather[0].description,
            country: res.data.sys.country.toLowerCase(),
        })
    };

    render() {
        return (
            <div style={weatherStyle}>
                <h3>Tiempo en {this.props.cityName}, {this.state.country.toUpperCase()}</h3>
                <p>El tiempo en {this.props.cityName} <img src={`http://openweathermap.org/images/flags/${this.state.country}.png`} /> para hoy es de {this.state.temp_min}°C de temperatura minima y {this.state.temp_max}°C de temperatura máxima. </p>
                <p>La temperatura ahora es de {this.state.temp}°C con {this.state.description}.</p>
                <button onClick={() => this.handleClick()}>Update</button>
            </div>
        );
    }
}

const render = (appRoot) => {
    const App = (
        <div>
            <Person name={personA.name} age={personA.age} city={personA.city} />
            <Person name={personB.name} age={personB.age} city={personB.city} />
            <hr />
            <Weather cityName="Tarragona" />
            <Weather cityName="Anápolis" />
        </div>
    );

    ReactDOM.render(
        App,
        appRoot
    );
}

render(appRoot);