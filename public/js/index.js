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
  cursor: "pointer"
};

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
    this.city = {
      lat: '-16.3267',
      lon: '-48.9528',
      name: 'Anápolis',
      country: 'BR',
      flagImg: 'http://openweathermap.org/images/flags/br.png'
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
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Tiempo ahora"), /*#__PURE__*/React.createElement("p", null, "El tiempo en ", this.props.cityName, " ", /*#__PURE__*/React.createElement("img", {
      src: `http://openweathermap.org/images/flags/${this.state.country}.png`
    }), " para hoy es de ", this.state.temp_min, "\xB0C de temperatura minima y ", this.state.temp_max, "\xB0C de temperatura m\xE1xima. "), /*#__PURE__*/React.createElement("p", null, "La temperatura ahora es de ", this.state.temp, "\xB0C con ", this.state.description, "."), /*#__PURE__*/React.createElement("button", {
      onClick: () => this.handleClick()
    }, "Update"));
  }

}

const render = appRoot => {
  const template = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: personStyle,
    onClick: () => console.log(personA.name)
  }, personA.name, ", ", /*#__PURE__*/React.createElement("span", {
    id: personA.name
  }, personA.age), " de ", personA.city), /*#__PURE__*/React.createElement("p", null, "q tal? ", personA.name, " "), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleClick(personA, 'sumar')
  }, "+1"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleClick(personA, 'restar')
  }, "-1"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleClick(personA, 'reset')
  }, "reset"), /*#__PURE__*/React.createElement("h3", {
    style: personStyle,
    onClick: () => console.log(personB.name)
  }, personB.name, ", ", /*#__PURE__*/React.createElement("span", {
    id: personB.name
  }, personB.age), " de ", personB.city), /*#__PURE__*/React.createElement("p", null, "q tal? ", personB.name, " "), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleClick(personB, 'sumar')
  }, "+1"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleClick(personB, 'restar')
  }, "-1"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleClick(personB, 'reset')
  }, "reset"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(Weather, {
    cityName: "Tarragona"
  }), /*#__PURE__*/React.createElement(Weather, {
    cityName: "An\xE1polis"
  }));
  ReactDOM.render(template, appRoot);
};

render(appRoot);
