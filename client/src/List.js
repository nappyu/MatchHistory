function App() {
  
    const [todos, setTodos] = React.useState(null);
    const [value, setValue] = React.useState('');
  
    
    
    function handleGetMatchUpHistory(e) {
      e.preventDefault();
      const data = { pid: value };
      console.log('submit');
      console.log(value);
      fetch('/api/matchUp', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(res =>  console.log(res));
    }
  
    function handleWin(e) {
      e.preventDefault();
      const data = { pid: value};
      console.log('submit');
      console.log(value);
      fetch('/api/matchUp/win', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(res =>  console.log(res));
    }
  
    function handleLoss(e) {
      e.preventDefault();
      const data = { pid: value};
      console.log('submit');
      console.log(value);
      fetch('/api/matchUp/loss', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(res =>  console.log(res));
    }
  
    function handleValue(e) {
      setValue(e.target.value);
    }
    return (
      <div className="App">
      <header className="App-header">
          <div id="login">
          <form action="" onSubmit={handleGetMatchUpHistory}>
              <input type="text" placeholder='Enter your player ID' onChange={handleValue} />
              <button> submit </button>
            </form>
          </div>
          <div id="searchContainer">
          <select className="mdb-select md-form colorful-select dropdown-primary" searchable="Search here..">
              <option value="1">Mario</option>
              <option value="2">Bowser</option>
              <option value="3">Marth</option>
              <option value="4">Link</option>
              <option value="5">Kirby</option>
          </select>
          <select className="mdb-select md-form colorful-select dropdown-primary" searchable="Search here..">
              <option value="1">Bowser</option>
              <option value="2">Mario</option>
              <option value="3">Marth</option>
              <option value="4">Link</option>
              <option value="5">Kirby</option>
          </select>
          </div>
          <div id="buttonContainer">
            <form action="" onSubmit={handleWin}>
              <button type="button home-button" id="button1" >WIN</button>
            </form>
            <form action="" onSubmit={handleLoss}>
              <button type="button home-button" id="button2" >LOSS</button>
            </form>
            
          </div>
          <div id="outputField">
            output matchup history here
          </div>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          Welcome to my website
          </p>
          <a
          className="App-link"
          href="https://github.com/nappyu"
          target="_blank"
          rel="noopener noreferrer"
          >
          My GitHub
          </a>
      </header>
      </div>
      
    );
  }
  
  export default App;