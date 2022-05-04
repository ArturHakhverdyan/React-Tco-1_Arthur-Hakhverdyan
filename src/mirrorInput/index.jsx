import './styles.css'
import { Component } from "react";
import { Input } from "./input";
import { Result } from "./result";

export class MirrorInput extends Component {
    state = {
        value: ''
    }
    changeValue = ({target}) => {
        const resultValue = target.value
        this.setState({value:resultValue})

    }
    render () {
        return (
            <div className='mirror-input'>
                <Input  changeValue = {this.changeValue}/>
                <Result  value = {this.state.value}/>
            </div>
        )
    }
}