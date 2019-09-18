import React, { Component } from 'react';
import './App.css';

import { Container, Typography, Grid, Button, Card, CardContent, Box, IconButton, Fade } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { PRESET_PLAYERS } from './constants';
import EditableText from './components/EditableText';
import PlayerSlider from './components/PlayerSlider';
import { randomize } from './randomize';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],//PRESET_PLAYERS,
      teamA: [],
      teamB: []
    };
  }

  handleAddPlayer(player) {
    let nPlayers = this.state['players'].length;
    if (nPlayers < 10) {
      if (typeof player == 'string' && player === 'new') {
        
        this.setState({players: [...this.state['players'], {name: `Player-${nPlayers}`, ratio: 0.5}]})
      } else if (typeof player == 'object') {
        this.setState({players: [...this.state['players'], Object.assign({}, player)]})
      }
    }
  }

  handleRemovePlayer(index) {
    if (index <= this.state.players.length) {
      this.setState({
        players: this.state.players.filter((p, i) => i !== index),
        teamA: [],
        teamB: []
      })
    }
  }

  handlePlayerNameChange(player, value) {
    console.log(player, value);
    let index = this.state.players.findIndex(p => p['name'] === player['name']);
    let updatedPlayer = this.state.players[index];
    updatedPlayer['name'] = value;
    this.setState({
      players: [
        ...this.state.players.slice(0, index),
        updatedPlayer,
        ...this.state.players.slice(index + 1)
      ]
    });
    console.log(PRESET_PLAYERS)
  }

  handleChangeValue(player, value) {
    let index = this.state.players.findIndex(p => p['name'] === player['name']);
    let updatedPlayer = this.state.players[index];
    updatedPlayer['ratio'] = value / 100;
    this.setState({
      players: [
        ...this.state.players.slice(0, index),
        updatedPlayer,
        ...this.state.players.slice(index + 1)
      ]
    })
  }

  handleRoll() {
    console.log('rolling', this.state.players);
    try {
      let [a,b] = randomize(this.state['players']);
      this.setState({teamA: a, teamB: b});
    } catch(error) {
      alert(error);
      console.error(error);
    }
  }

  handleClear() {
    this.setState({players: [], teamA: [], teamB: []});
  }

  checkIfPlaying(player) {
    return this.state['players'].some(p => p['name'] === player['name']);
  }

  checkIfFull() {
    return this.state['players'].length === 10;
  }
  checkIfNotFull() {
    return this.state['players'].length < 10;
  }

  render() {
    var playerSelect = PRESET_PLAYERS.map(player => 
      <Grid key={player['name']} item>
        <Button variant="outlined" 
          onClick={() => this.handleAddPlayer(player)}
          disabled={this.checkIfPlaying(player) || this.checkIfFull()}
        >
          {player['name']}
        </Button>
      </Grid>
    );

    // .concat().sort((p1, p2) => p1['name']-p2['name']); // todo - sort
    var selectedPlayers = this.state['players'].map((player, index) =>
      <Grid key={index} item sm={6} xs={12}>
        <Card>
          {/* <CardHeader
            title={player['name']}
            action={
              <IconButton onClick={() => this.handleRemovePlayer(index)}>
                <Close />
              </IconButton>
            }
          >
          </CardHeader> */}
          <CardContent>
            <Box pb={2}>
              <Grid container justify="space-between">
                <Grid item xs={11}>
                  {/* <Typography variant="h5">{player['name']}</Typography> */}
                  <EditableText
                    text={player['name']}
                    onTextChange={(newName) => this.handlePlayerNameChange(player, newName)}
                    variant="h5"
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton className="offset-y-10" onClick={() => this.handleRemovePlayer(index)}>
                    <Close />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
            
            <Box px={2}>
              <PlayerSlider 
                ratio={player['ratio']}
                handleChange={(val) => this.handleChangeValue(player, val)}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );

    var teamA = this.state.teamA.map((p, i) => 
      <div key={i}>{p['name']}</div> 
    );
    var teamB = this.state.teamB.map((p, i) => 
      <div key={i}>{p['name']}</div> 
    );
    var matchup = (this.state.teamA.length === 5 && this.state.teamB.length === 5) ? (
      <Box mb={3}>
        <Grid container alignItems="center" justify="center">
          <Grid item sm={5}><Typography variant="h5" align="right">{teamA}</Typography></Grid>
          <Grid item sm={2}><Typography variant="h2" align="center"> vs </Typography></Grid>
          <Grid item sm={5}><Typography variant="h5" align="left">{teamB}</Typography></Grid>
        </Grid>

      </Box>
    ) : '';

    return(
      <Container>
        <Typography align="center" variant="h1" className="hide">DC: Civil War</Typography>     
          <Fade in={!this.checkIfFull()}> 
            <Box display={this.checkIfFull() ? 'none' : '' }> {/* Hack-y way to hide in DOM w/ animation. Might be better to use plain CSS */}
              <Box pb={2}>
                <Typography variant="h5">
                  Select Players <Typography variant="subtitle1" component="span">({this.state.players.length}/10 Players Added)</Typography>
                </Typography>
              </Box>

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
                  <Button 
                    variant="outlined" 
                    onClick={() => this.handleClear('new')}
                  >
                    Clear
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Fade>
        
        <Fade in={this.checkIfFull()}>
            <Box pb={2}  display={this.checkIfFull() ? '' : 'none' }>
              { matchup }
              <Button 
                color="primary"
                variant="contained"
                fullWidth={true}
                onClick={() => this.handleRoll()}
              >
                Roll Roles and Teams!
              </Button>
              <Button 
                color="secondary"
                variant="outlined"
                fullWidth={true}
                onClick={() => this.handleClear()}
              >
                Clear
              </Button>
            </Box>
        </Fade>

        <Box pb={2}>
          <Grid container alignContent="space-around" spacing={2} pb={2}>
            {selectedPlayers}
          </Grid>
        </Box>        
  
      </Container>

    );
  }
}

  
export default App;
