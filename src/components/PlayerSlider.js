import React from 'react'
import { Slider } from '@material-ui/core';

import { PLAYER_SLIDER_MARKS } from '../constants';

class PlayerSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {edit: false, editRatio: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(val) {
        this.setState({editRatio: val})
    }

    render() {
        return (
            <Slider 
              value={this.props.ratio * 100}
              marks={PLAYER_SLIDER_MARKS}
              valueLabelDisplay="on"
              step={5}
              onChange={(e, val) => this.props.handleChange(val)}
            //   onChangeCommitted={(e,val) => this.handleChangeValue(player, val)}
            />
        )
    }
}

export default PlayerSlider