import React from 'react';
import { Link } from 'react-router-dom';

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: '', name: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('/notes/get/' + this.props.match.params.id)
            .then(response => {
                return response.json();
            }).then(result => {
            console.log(result);
            this.setState({
                id:result.id,
                name:result.name,
            });
        });
    }

    handleChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('/notes/saveNote',{method: 'PUT', body:JSON.stringify({id: this.state.id, name: this.state.name}),
            headers:{"Content-type":"application/json; charset=UTF-8"}})
            .then(response=>{if (response.status===200)
                alert("Note added successfully");
                this.props.history.push('/');
                fetch('/notes',{method: 'GET',}).then(response => {
                    return response.json()
                })
                    .then(result => {
                        console.log(result);
                        this.setState({notes: result});
                        window.location.reload();
                    });
            });
    }

    render() {
        return (
            <div id="container">
                <Link to="/">
                    <button className="button buttonNotes">Notes</button></Link>
                <p/>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Write note" style={{height: "200px"}} />
                    </p>
                    <p>
                        <input type="submit" value="Edit Note" id="inputAdd"/>
                    </p>
                </form>
            </div>
        );
    }
}export default Update;