import React, { Component } from 'react'
import API from '../helpers/API';

export default class SelectTipo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipos : [],
        };
    }

    componentDidMount(){
        const fetchApi = async () => {
            const { tipos } = await API({
                url: "http://localhost:4000/api/tipos"
            });
            this.setState({tipos});
        }
    }

  render() {
    return (
        <select className="text-black w-[100%]" value={this.props.tipo} onChange={this.props.handlerChange} name='tipo'>
            <option value=""></option>
            {
                this.state.tipos.map(({_id,descripcion}) => (<option key={_id}>{descripcion}</option>))
            }
        </select>
    )
  }
}
