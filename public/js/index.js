'use strict';

const appRoot = document.getElementById('appRoot');
const personA = {
  name: 'Perico',
  age: 26
};
const personB = {
  age: 17,
  city: 'Riba Roja d\'Ebre'
};
const personStyle = {
  border: "3px solid blue",
  marginTop: "10px",
  paddingLeft: "5px",
  paddingBottom: "5px"
};

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      age: props.age,
      city: props.city,
      defaultAge: 0
    };
  }

  componentDidMount() {
    this.setState({
      defaultAge: this.state.age
    });
  }

  handleClick(func) {
    switch (func) {
      case 'sumar':
        this.setState({
          age: this.state.age + 1
        });
        break;

      case 'restar':
        this.setState({
          age: this.state.age - 1
        });
        break;

      case 'reset':
        this.setState({
          age: this.state.defaultAge
        });
        break;

      default:
        break;
    }
  }

  getCity() {
    return this.state.city ? `de ${this.state.city}` : null;
  }

  getName() {
    return this.state.name ? this.state.name : 'Anónimo';
  }

  getAge() {
    if (this.state.age && this.state.age > 18) {
      return this.state.age;
    } else {
      return null;
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      style: personStyle
    }, /*#__PURE__*/React.createElement("h3", null, this.getName(), ", ", this.getAge(), " ", this.getCity()), /*#__PURE__*/React.createElement("p", null, "q tal? ", this.getName(), " "), /*#__PURE__*/React.createElement("button", {
      onClick: () => this.handleClick('sumar')
    }, "+1"), /*#__PURE__*/React.createElement("button", {
      onClick: () => this.handleClick('restar')
    }, "-1"), /*#__PURE__*/React.createElement("button", {
      onClick: () => this.handleClick('reset')
    }, "reset"));
  }

}

const weatherStyle = {
  border: "2px dotted green",
  padding: "10px",
  margin: "5px"
};

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp_min: 0,
      temp_max: 0,
      temp: 0,
      description: '',
      country: ''
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
    let res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.props.cityName}&appid=${weatherApiKey}&units=metric&lang=es`);
    this.setState({
      temp_min: res.data.main.temp_min,
      temp_max: res.data.main.temp_max,
      temp: res.data.main.temp,
      description: res.data.weather[0].description,
      country: res.data.sys.country.toLowerCase()
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      style: weatherStyle
    }, /*#__PURE__*/React.createElement("h3", null, "Tiempo en ", this.props.cityName, ", ", this.state.country.toUpperCase()), /*#__PURE__*/React.createElement("p", null, "El tiempo en ", this.props.cityName, " ", /*#__PURE__*/React.createElement("img", {
      src: `http://openweathermap.org/images/flags/${this.state.country}.png`
    }), " para hoy es de ", this.state.temp_min, "\xB0C de temperatura minima y ", this.state.temp_max, "\xB0C de temperatura m\xE1xima. "), /*#__PURE__*/React.createElement("p", null, "La temperatura ahora es de ", this.state.temp, "\xB0C con ", this.state.description, "."), /*#__PURE__*/React.createElement("button", {
      onClick: () => this.handleClick()
    }, "Update"));
  }

}

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%"
};
const labelResultStyle = {
  marginTop: "10px",
  width: "100%",
  textAlign: "center",
  border: "1px orange dashed",
  fontWeight: "bold",
  fontSize: "20px"
};

class CountryByCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchResult: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
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
        result = 'Nothing Found';
      } else if (error.response.status == 400) {
        result = 'Invalid Search';
      }
    }

    this.setState({
      searchResult: result
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: centerStyle
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: this.state.value,
      placeholder: "Buscar pa\xEDs",
      maxLength: "3",
      onChange: this.onChange
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => this.onSubmit()
    }, "Buscar Por codigo ISO 3166")), this.state.searchResult ? /*#__PURE__*/React.createElement("div", {
      style: (centerStyle, labelResultStyle)
    }, " ", this.state.searchResult) : null);
  }

}

class IpInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: '0.0.0.0',
      region: '',
      country: ''
    };
  }

  componentDidMount() {
    this.getIpInfo();
  }

  async getIpInfo() {
    let ipinfo = await axios.get(`https://ipinfo.io/?token=7a4e2c82e00b94`);
    let countryName = await axios.get(`https://restcountries.eu/rest/v2/alpha/${ipinfo.data.country}`);
    this.setState({
      ip: ipinfo.data.ip,
      region: ipinfo.data.region,
      country: countryName.data.name
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      style: centerStyle
    }, /*#__PURE__*/React.createElement("label", null, "Visita desde ", this.state.region, ", ", this.state.country, " con la direcci\xF3n IP: ", this.state.ip));
  }

}

const render = appRoot => {
  const App = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(IpInfo, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(Person, {
    name: personA.name,
    age: personA.age
  }), /*#__PURE__*/React.createElement(Person, {
    name: personB.name,
    age: personB.age,
    city: personB.city
  }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(Weather, {
    cityName: "Tarragona"
  }), /*#__PURE__*/React.createElement(Weather, {
    cityName: "An\xE1polis"
  }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(CountryByCode, null));
  console.log(App);
  ReactDOM.render(App, appRoot);
};

render(appRoot);
