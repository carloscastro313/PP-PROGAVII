import React, { Component } from 'react'
import API from '../helpers/API';

export default class SelectTipo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipos : [],
        };
    }

    async componentDidMount(){
        const tipos = await API("http://localhost:4000/tipos");
        this.setState({tipos});
    }

  render() {
    return (
        <select className="text-black" value={this.props.tipo} onChange={this.props.handlerChange} name='tipo'>
            {
                this.state.tipos.map(({id,descripcion}) => (<option key={id}>{descripcion}</option>))
            }
        </select>
    )
  }
}
