import React from 'react';
import { input, Form }  from "react-bootstrap";
import logo from './misaka.svg';
import './App.css';
import './fstdropdown.css';

class App extends React.Component {
  constructor(props){
    super(props)
    //const [todos, setTodos] = React.useState(null);
    //const [value, setValue] = React.useState('');
    this.state = {pid: '', hero: 'Mario', opponent: 'Bowser', winRate: [], history: []}
    this.handleChange = this.handleChange.bind(this);
    this.handleGetMatchUpHistory = this.handleGetMatchUpHistory.bind(this);
    this.handleWin = this.handleWin.bind(this);
    this.handleLoss = this.handleLoss.bind(this);
    this.handleWinRate = this.handleWinRate.bind(this);

  }

  handleChange(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
    
  }

  
  async handleGetMatchUpHistory(e) {
    e.preventDefault();
    const data = { pid: this.state.pid };
    if(this.state.pid == '') {
      window.alert("please enter a pid")
    }
    console.log('submit');
    fetch('/api/matchUp', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res =>  {
        this.setState({history: res}
      )}
    );
    
  }

  

  async handleWin(e) {
    e.preventDefault();
    const data = { 
      pid: this.state.pid,
      hero: this.state.hero,
      opponent: this.state.opponent
    };
    if(this.state.pid == '') {
      window.alert("please enter a pid")
    }
    console.log('submit');
    fetch('/api/matchUp/win', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res =>  this.setState({winRate: res}, () => console.log(this.state.res)));
    this.handleGetMatchUpHistory(e);

  }

  async handleLoss(e) {
    e.preventDefault();
    const data = { 
      pid: this.state.pid,
      hero: this.state.hero,
      opponent: this.state.opponent
    };
    if(this.state.pid == '') {
      window.alert("please enter a pid")
    }
    console.log('submit');
    fetch('/api/matchUp/loss', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res =>  this.setState({winRate: res}, () => console.log(this.state.res)));
      this.handleGetMatchUpHistory(e);
  }

  async handleWinRate(e) {
    e.preventDefault();
    const data = { 
      pid: this.state.pid,
      hero: this.state.hero,
      opponent: this.state.opponent
    };
    if(this.state.pid == '') {
      window.alert("please enter a pid")
    }
    console.log('submit');
    fetch('/api/matchUp/winRate', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res =>  this.setState({winRate: res}, () => console.log(this.state.res)));
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">    
        <img src={logo} className="App-logo" alt="logo" />
          <p> Welcome smashups </p>
          <p> A Smash Bros Ultimate match history tracker </p>
          <a
            className="App-link"
            href="https://github.com/nappyu"
            target="_blank"
            rel="noopener noreferrer"
            >
            My GitHub
          </a>    
          <div id="login">
            <form action="" onSubmit={this.handleGetMatchUpHistory}>
              <input type="text" value={this.state.pid} placeholder='Enter your player ID' onChange={this.handleChange('pid')} />
              <button class="btn btn-primary btn-lg" id="gethistory"> Get Match History </button>
            </form>
          </div>        
          <div id="searchContainer">
            <div id = "leftbox">
              <h1>You</h1>
              <select class="fstdropdown-select" value={this.state.hero} id="bar1" onChange={this.handleChange('hero')}>                  
                  <option value="Marth">Marth</option><option value="Kirby">Kirby</option><option value="Lucina">Lucina</option>
                  <option value="Joker">Joker</option><option value="Hero">Hero</option><option value="Terry">Terry</option>
                  <option value="Banjo">Banjo</option><option value="Mario">Mario</option><option value="Donkey Kong">Donkey Kong</option>
                  <option value="Link">Link</option><option value="Samus">Samus</option><option value="Dark Samus">Dark Samus</option>
                  <option value="Yoshi">Yoshi</option><option value="Fox">Fox</option><option value="Pikachu">Pikachu</option>
                  <option value="Luigi">Luigi</option><option value="Ness">Ness</option><option value="Captain Falcon">Captain Falcon</option>
                  <option value="JigglyPuff">JigglyPuff</option><option value="Peach">Peach</option><option value="Daisy">Daisy</option>
                  <option value="Bowser">Bowser</option><option value="Ice Climbers">Ice Climbers</option><option value="Sheik">Sheik</option>
                  <option value="Zelda">Zelda</option><option value="Dr.Mario">Dr.Mario</option><option value="Piranha Plant">Piranha Plant</option>
                  <option value="Pichu">Pichu</option><option value="Falco">Falco</option><option value="Young Link">Young Link</option>
                  <option value="Ganondorf">Ganondorf</option><option value="Mewtwo">Mewtwo</option><option value="Roy">Roy</option>
                  <option value="Chrom">Chrom</option><option value="Mr. Game & Watch">Mr. Game & Watch</option><option value="Meta Knight">Meta Knight</option>
                  <option value="Pit">Pit</option><option value="Dark Pit">Dark Pit</option><option value="Zero Suit Samus">Zero Suit Samus</option>
                  <option value="Wario">Wario</option><option value="Snake">Snake</option><option value="Ike">Ike</option>
                  <option value="PKMN Trainer">PKMN Trainer</option><option value="Diddy Kong">Diddy Kong</option><option value="Lucas">Lucas</option>
                  <option value="Sonic">Sonic</option><option value="King Dedede">King Dedede</option><option value="Olimar">Olimar</option>
                  <option value="Lucario">Lucario</option><option value="R.O.B.">R.O.B</option><option value="Toon Link	">Toon Link	</option>v
                  <option value="Wolf">Wolf</option><option value="Villager">Villager</option><option value="Mega Man">Mega Man</option>
                  <option value="Wii Fit Trainer">Wii Fit Trainer</option><option value="Rosalina">Rosalina</option><option value="Little Mac">Little Mac</option>
                  <option value="Greninja">Greninja</option><option value="Mii Fighter Sword">Mii Sword</option><option value="Mii Fighter Melee">Mii Melee</option>
                  <option value="Mii Gunner">Mii Gunner</option><option value="Palutena">Palutena</option><option value="Pac-Man">Pac-Man</option>
                  <option value="Robin">Robin</option><option value="Shulk">Shulk</option><option value="Bowser Jr.">Bowser Jr.</option>
                  <option value="Duck Hunt">Duck Hunt</option><option value="Ryu"></option>Ryu<option value="Ken">Ken</option><option value="Byleth">Byleth</option>
                  <option value="Cloud">Cloud</option><option value="Corrin">Corrin</option><option value="Bayonetta">Bayonetta</option>
                  <option value="Inkling">Inkling</option><option value="Ridley">Ridley</option><option value="Simon Belmont">Simon Belmont</option>
                  <option value="Richter">Richter</option><option value="King K. Rool">King K. Rool</option><option value="Isabelle">Isabelle</option>
                  <option value="Incineroar">Incineroar</option><option value="Pokemon Trainer">Pokemon Trainer</option><option value="Rob">Rob</option>
              </select>
            </div>
            <div id = "rightbox">
              <h2>Opponent</h2>
              <select class="fstdropdown-select" value={this.state.opponent} id="bar2" onChange={this.handleChange('opponent')}>
                  <option value="Marth">Marth</option><option value="Kirby">Kirby</option><option value="Lucina">Lucina</option>
                  <option value="Joker">Joker</option><option value="Hero">Hero</option><option value="Terry">Terry</option>
                  <option value="Banjo">Banjo</option><option value="Mario">Mario</option><option value="Donkey Kong">Donkey Kong</option>
                  <option value="Link">Link</option><option value="Samus">Samus</option><option value="Dark Samus">Dark Samus</option>
                  <option value="Yoshi">Yoshi</option><option value="Fox">Fox</option><option value="Pikachu">Pikachu</option>
                  <option value="Luigi">Luigi</option><option value="Ness">Ness</option><option value="Captain Falcon">Captain Falcon</option>
                  <option value="JigglyPuff">JigglyPuff</option><option value="Peach">Peach</option><option value="Daisy">Daisy</option>
                  <option value="Bowser">Bowser</option><option value="Ice Climbers">Ice Climbers</option><option value="Sheik">Sheik</option>
                  <option value="Zelda">Zelda</option><option value="Dr.Mario">Dr.Mario</option><option value="Piranha Plant">Piranha Plant</option>
                  <option value="Pichu">Pichu</option><option value="Falco">Falco</option><option value="Young Link">Young Link</option>
                  <option value="Ganondorf">Ganondorf</option><option value="Mewtwo">Mewtwo</option><option value="Roy">Roy</option>
                  <option value="Chrom">Chrom</option><option value="Mr. Game & Watch">Mr. Game & Watch</option><option value="Meta Knight">Meta Knight</option>
                  <option value="Pit">Pit</option><option value="Dark Pit">Dark Pit</option><option value="Zero Suit Samus">Zero Suit Samus</option>
                  <option value="Wario">Wario</option><option value="Snake">Snake</option><option value="Ike">Ike</option>
                  <option value="PKMN Trainer">PKMN Trainer</option><option value="Diddy Kong">Diddy Kong</option><option value="Lucas">Lucas</option>
                  <option value="Sonic">Sonic</option><option value="King Dedede">King Dedede</option><option value="Olimar">Olimar</option>
                  <option value="Lucario">Lucario</option><option value="R.O.B.">R.O.B</option><option value="Toon Link	">Toon Link	</option>v
                  <option value="Wolf">Wolf</option><option value="Villager">Villager</option><option value="Mega Man">Mega Man</option>
                  <option value="Wii Fit Trainer">Wii Fit Trainer</option><option value="Rosalina">Rosalina</option><option value="Little Mac">Little Mac</option>
                  <option value="Greninja">Greninja</option><option value="Mii Fighter Sword">Mii Sword</option><option value="Mii Fighter Melee">Mii Melee</option>
                  <option value="Mii Gunner">Mii Gunner</option><option value="Palutena">Palutena</option><option value="Pac-Man">Pac-Man</option>
                  <option value="Robin">Robin</option><option value="Shulk">Shulk</option><option value="Bowser Jr.">Bowser Jr.</option>
                  <option value="Duck Hunt">Duck Hunt</option><option value="Ryu"></option>Ryu<option value="Ken">Ken</option><option value="Byleth">Byleth</option>
                  <option value="Cloud">Cloud</option><option value="Corrin">Corrin</option><option value="Bayonetta">Bayonetta</option>
                  <option value="Inkling">Inkling</option><option value="Ridley">Ridley</option><option value="Simon Belmont">Simon Belmont</option>
                  <option value="Richter">Richter</option><option value="King K. Rool">King K. Rool</option><option value="Isabelle">Isabelle</option>
                  <option value="Incineroar">Incineroar</option><option value="Pokemon Trainer">Pokemon Trainer</option><option value="Rob">Rob</option>
              </select>
            </div>
          </div>
          <div id="buttonContainer">
            <form action="" onSubmit={this.handleWin}>
              <button type="button home-button" class="btn btn-primary btn-lg" id="button1" >WIN</button>
            </form>
            <form action="" onSubmit={this.handleLoss}>
              <button type="button home-button" class="btn btn-primary btn-lg" id="button2" >LOSS</button>
            </form>
            <form action="" onSubmit={this.handleWinRate}>
              <button type="button home-button" class="btn btn-primary btn-lg"  id="button3" >Get WinRate</button>
            </form>
          </div>
          <div id="outputField">
            WinRate
            <ul>
              {this.state.winRate}
            </ul>
            Match History
            
            <div class="my-custom-scrollbar my-custom-scrollbar-primary">
                {this.state.history.map(history =>
                  <li>{history}</li>)
                }              
            </div>
          </div>
          
        </header>
      </div>
      
    );
  }
  
}

export default App;
