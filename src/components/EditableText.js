import React from 'react'
import { Typography, IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

class EditableText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {edit: false, editText: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    startEdit() {
        this.setState({edit: true, editText: this.props.text});
    }

    handleChange(e) {
        this.setState({editText: e.target.value})
    }
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.props.onTextChange(e.target.value);
            this.setState({edit: false});
        }
    }
    
    render() {
        const {text, onTextChange, ...props} = this.props;
        return (
            <>
                {this.state.edit &&
                    <input type="text" value={this.state.editText} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
                }
                {!this.state.edit  &&
                    <Typography {...props} onDoubleClick={() => this.startEdit()}>
                        {text}
                        <Typography variant="subtitle1" component="sup">
                            <IconButton onClick={() => this.startEdit()} edge="end" style={{position: 'relative', left: -10}}>
                                <Edit style={{fontSize: '0.9rem'}}/>
                            </IconButton>
                        </Typography>
                    </Typography>
                }
            </>
        )
    }
} 

export default EditableText