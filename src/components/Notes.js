import React from 'react';
import {Link} from 'react-router-dom';
import {ButtonGroup} from 'reactstrap';

class Notes extends React.Component{

    constructor(props){
        super(props);
        this.state={notes:[]};
        this.headers=[
            {key:'id', label:'Id'},
            {key:'name', label:'Name'}
        ];
    }

    componentDidMount(){
        fetch('/notes')
            .then(response => {
                return response.json();
            }).then(result => {
                  console.log(result);
                  this.setState({
                      notes:result
                  });
                });
    }

    deleteNote(id) {
        if (window.confirm("Are you sure want to delete?")) {
            fetch('/notes/delete/' + id, {method: 'POST',})
                .then(response => {
                    if (response.status === 200)
                    {
                         alert("Note deleted successfully");
                         fetch('/notes',{method: 'GET',}).then(response => {
                            return response.json()
                         })
                        .then(result => {
                            console.log(result);
                            this.setState({notes: result});
                        });
                    }
                });
        }
    }
    render(){
        return (
            <div id="container">
                <Link to="/create">
                    <button className="button button1">Add Note</button>
                </Link>
                    <table>
                            <thead>
                            <tr>
                                <th width="20%">Note</th>
                                <th width="5%">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                             {this.state.notes.map(function(notes, key) {
                                 return (
                                 <tr key = {key}>
                                     <td>{notes.name}</td>
                                     <td>
                                        <ButtonGroup>
                                          <Link to={`/update/${notes.id}`}><button className="button button2">Edit</button></Link>
                                          <button className="button button3" onClick={this.deleteNote.bind(this,notes.id)}>Delete</button>
                                        </ButtonGroup>
                                     </td>
                                 </tr>
                                 )}.bind(this))
                             }
                             </tbody>
                    </table>
            </div>
        )
    }
}export default Notes;
