'use strict';
const appRoot = document.getElementById('appRoot');

const personA = {
    name: 'Perico',
    age: 26,
};
const personB = {
    age: 17,
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

    getCity() {
        return this.state.city ? <span>de {this.state.city}</span> : null;
    }

    getName() {
        return this.state.name ? <span>{this.state.name}</span> : <span>Anónimo</span>;
    }

    getAge() {
        if (this.state.age && this.state.age > 18) {
            return <span>{this.state.age}</span>
        } else {
            return null
        }
    }

    render() {
        return (
            <div style={personStyle}>
                <h3>{this.getName()}, <span id={this.state.name}>{this.getAge()}</span> {this.getCity()}</h3>
                <p>q tal? {this.state.name} </p>
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

const centerStyle = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
}

const labelResultStyle = {
    marginTop: "10px",
    width: "100%",
    textAlign: "center",
    border: "1px orange dashed",
    fontWeight: "bold",
    fontSize: "20px",
}

class CountryByCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            searchResult: '',
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    onSubmit(e) {
        this.getCountry(this.state.value);
    }

    async getCountry(code) {
        let result;
        try {
            let res = await axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`);
            result = res.data.name;
        } catch (error) {
            if (error.response.status == 404) {
                result = 'Nothing Found'
            } else if (error.response.status == 400) {
                result = 'Invalid Search'
            }
        }
        this.setState({ searchResult: result })
    }

    render() {
        return (
            <div>
                <div style={centerStyle}>
                    <input type="text" value={this.state.value} placeholder="Buscar país"
                        maxLength="3" onChange={this.onChange} />
                    <button onClick={() => this.onSubmit()}>Buscar Por codigo ISO 3166</button>
                </div>
               {this.state.searchResult
                    ? <div style={centerStyle, labelResultStyle}> {this.state.searchResult}</div>
                    : null
                }
            </div>
        );
    }
}

class IpInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: '0.0.0.0',
            region: '',
            country: '',
        }
    }

    componentDidMount() {
        this.getIpInfo();
    }

    async getIpInfo() {
        let ipinfo = await axios.get(`https://ipinfo.io/?token=7a4e2c82e00b94`);
        let countryName = await axios.get(`https://restcountries.eu/rest/v2/alpha/${ipinfo.data.country}`)
        this.setState({
            ip: ipinfo.data.ip,
            region: ipinfo.data.region,
            country: countryName.data.name,
        })
    }

    render() {
        return (
            <div style={centerStyle}>
                <label>Visita desde {this.state.region}, {this.state.country} con la dirección IP: {this.state.ip}</label>
            </div>
        );
    }
}

const render = (appRoot) => {
    const App = (
        <div>
            <IpInfo />
            <hr />
            <Person name={personA.name} age={personA.age} />
            <Person name={personB.name} age={personB.age} city={personB.city} />
            <hr />
            <Weather cityName="Tarragona" />
            <Weather cityName="Anápolis" />
            <hr />
            <CountryByCode />
        </div>
    );

    console.log(App);
    ReactDOM.render(App, appRoot);
}

render(appRoot);