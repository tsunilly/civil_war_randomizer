import React, { Component } from 'react';
import './App.css';

import { Container, Typography, Grid, Button, Card, CardContent, Slider, CardHeader, Box } from '@material-ui/core';

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
      players: [],//PRESET_PLAYERS,
    };
  }

  handleAddPlayer(player) {
    let nPlayers = this.state['players'].length;
    if (nPlayers < 10) {
      if (typeof player == 'string' && player === 'new') {
        
        this.setState({'players': [...this.state['players'], {name: `Player-${nPlayers}`, ratio: 0.5}]})
      } else if (typeof player == 'object') {
        this.setState({'players': [...this.state['players'], player]})
      }
    }
  }

  checkIfPlaying(player) {
    return this.state['players'].some(p => p['name'] === player['name']);
  }

  render() {
    var playerSelect = PRESET_PLAYERS.map(player => 
      <Grid key={player['name']} item>
        <Button variant="outlined" 
          onClick={() => this.handleAddPlayer(player)}
          disabled={this.checkIfPlaying(player) || this.state['players'].length === 10}
        >
          {player['name']}
        </Button>
      </Grid>
    );

    var selectedPlayers = this.state['players'].map(player =>
      <Grid key={player['name']} item xs={6}>
        <Card>
          <CardHeader
            title={player['name']}
          >
            
          </CardHeader>
          <CardContent>
            <Box px={2}>
            <Slider 
              defaultValue={player['ratio'] * 100} 
              marks={SLIDER_MARKS}
              valueLabelDisplay="on"
              step={5}
            />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );

    return(
      <Container>
        <Typography align="center" variant="h1">Header</Typography>
        <div>Select players:</div>

        <Grid container justify="center" alignContent="space-around" alignItems="stretch" spacing={1}>
          { playerSelect }
        </Grid>
        <hr className="hr-text" data-content="OR"/>
        
        <Box pb={2}>
          <Grid container justify="center">
            <Button 
              variant="contained" 
              onClick={() => this.handleAddPlayer('new')}
              disabled={this.state['players'].length === 10}
            >
              Add a Custom Player
            </Button>
          </Grid>
        </Box>

        <Box pb={2}>
          players:
          <Grid container alignContent="space-around" spacing={2} pb={2}>
            {selectedPlayers}
          </Grid>
        </Box>

        {this.state['players'].length === 10 && 
          <Box>
            <Button 
              color="primary"
              variant="contained"
              fullWidth={true}
            >
              Roll Roles and Teams!
            </Button>
          </Box>
        }

        
  
      </Container>

    );
  }
}

  
export default App;
