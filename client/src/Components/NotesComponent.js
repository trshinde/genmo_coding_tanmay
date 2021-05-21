import React, { Component } from 'react'
import AddNoteFeatureComponent from './AddNoteFeatureComponent';

class NotesComponent extends Component {
    render() {
        const {notes, deleteNote, saveNote, firstName } = this.props;
        return (
            <>
            <div className="m-4 mt-6 mb-0">
                <textarea id="notes" rows="1" cols="50" placeholder="Add a note" onChange={(e) => this.props.getNote(e)}>
                </textarea>
            </div>
            <div className="d-flex flex-row m-4 mt-3">
            <div onClick={this.props.addNote}>
                <button className="button">Add Note</button>
            </div>
            <div className="clear-button" onClick={this.props.clearNote}>
                <button className="button">Clear</button>
            </div>
            </div>
            <AddNoteFeatureComponent 
                notes={notes[firstName]}
                deleteNote={deleteNote}
                saveNote={saveNote} />
            </>
        )
    }
}

export default NotesComponent;

