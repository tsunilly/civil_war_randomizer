import React, { Component } from 'react';
import './App.css';

import { Container, Typography, Grid, Button, Card, CardContent, Slider } from '@material-ui/core';

const PRESET_PLAYERS = [
  {name: 'tsunilly', ratio: 0.5},
  {name: 'Lomi', ratio: 1.0}, 
  {name: 'Dale', ratio: 0.2}, 
  {name: 'Josh', ratio: 1.0}, 
  {name: 'Space Princess', ratio: 0.9}, 
  {name: 'Le', ratio: 0.0}, 
  {name: 'Joy', ratio: 0.7}, 
  {name: 'Bugs', ratio: 0.0}, 
  {name: 'Cal', ratio: 0.0},
  {name: 'Jonie', ratio: 0.5},
  {name: 'Kebodo', ratio: 1.0},
  {name: 'JK', ratio: 0.5},
]

const SLIDER_MARKS = [
  {
    value: 0,
    label: 'Support'
  },
  {
    value: 100,
    label: 'Core'
  }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: PRESET_PLAYERS,
    };
  }

  handleAddPlayer(player) {
    if (typeof player == 'string' && player === 'new') {
      this.setState({'players': [...this.state['players'], {name: 'Newbie', ratio: 0.5}]})
    } else if (typeof player == 'object') {
      this.setState({'players': [...this.state['players'], player]})
    }
  }

  render() {
    var playerSelect = PRESET_PLAYERS.map(player => 
      <Grid key={player['name']} item>
        <Button variant="outlined" onClick={() => this.handleAddPlayer(player)}>
          {player['name']}
        </Button>
      </Grid>
    );

    var selectedPlayers = this.state['players'].map(player =>
      <Grid key={player['name']} item xs={6}>
        <Card>
          <CardContent>
            {player['name']} : 
            <Slider 
              defaultValue={player['ratio'] * 100} 
              marks={SLIDER_MARKS}
            />

          </CardContent>
        </Card>
      </Grid>
    );

    return(
      <Container>
        <Typography align="center" variant="h1">Header</Typography>
        <div>Select players:</div>

        <Grid container justify="center" alignContent="space-evenly" alignItems="stretch" spacing={1}>
          { playerSelect }
        </Grid>
        <hr className="hr-text" data-content="OR"/>
        
        <Grid container justify="center">
          <Button variant="contained">Add a Custom Player</Button>
        </Grid>

        players:
        <Grid container alignContent="space-evenly" spacing={2}>
          {selectedPlayers}
        </Grid>

        
  
      </Container>

    );
  }
}

  
export default App;
