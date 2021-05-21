import React from "react";
import { Table, Modal } from "react-bootstrap";
import DetailsComponent from '../../Components/DetailsComponent';
import ModalTabsComponent from '../../Components/ModalTabsComponent';
import NotesComponent from '../../Components/NotesComponent';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            selectedPatient: {},
            selectedComponent:"details",
            note: {},
            notesSaved: false,
            notes: {}
        }
    }


    renderBody = () => {
        const { patientDetails } = this.props;
        return (
          patientDetails &&
          patientDetails.map((item, index) => {
              return (
                  <tr key={index} onClick={() => this.handleShow(index, patientDetails)}>
                    <td>{item.First}</td>
                    <td>{item.Last}</td>
                    <td>{item.DOB}</td>
                    <td>{item.Email}</td>
                    <td>{item.phoneNo}</td>
                  </tr>
              );
            })
          );
    }

    // Select a particular tabs between : "details" and "notes"
    handleSelect = (selectedKey) => {
        this.setState({
            selectedComponent: selectedKey
        })
    }

    // Storing the note written into textarea in a note {} state object
    getNote = (e) => {
      const note = e.target.value;
      this.setState({
        note
      })
    }

    // Converting Date into specific time and date zone. 
    format_AM_PM = (date) =>{
      let hours = date.getHours();
      let minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

    dateConversion = (newDate) =>{
      const strVal = this.format_AM_PM(newDate);
      const strDate = newDate.toString();
      const str = strDate.split(" ");
      let date = str[1] + str[2] + "," + str[3] + " " + strVal;
      return date;
    }

    // Adding each note into objects of arrays
    // sample: notes:{ "Tanmay" : [{timestamp:"",note:"test1"},{...}] , "Nishank" : [{},{...}], "Archika" : [{},{...}]}.

    addNote = () => {
      let arrayOfNote=[];
      let { notes, note, selectedPatient } = this.state;
      const finalDate = this.dateConversion(new Date());
      const obj = { date: new Date(), timestamp:finalDate, note };
      if(notes && !notes[selectedPatient.First]){
        notes[selectedPatient.First]=[];
        notes[selectedPatient.First].push(obj);
      } else {
       notes[selectedPatient.First].map((item)=>{
        arrayOfNote.push(item.note);
        if(!arrayOfNote.includes(note)){
          notes[selectedPatient.First].push(obj);
        }
       })
      }
      notes[selectedPatient.First].sort((a,b)=>{
        if(a.date > b.date){
          return -1;
        } else if(a.date < b.date){
          return 1;
        } else if(a.date === b.date){
          return 1;
        }
      })
      if(note.length===0){
        return;
      }else{
        this.setState({
          notes
        })
      }
      this.clearNote()
    }

    // Showing details and notes for each selected item from a table.
    handleShow = (idx, patientDetails) => {
      localStorage.setItem("savedNotes", JSON.stringify(this.state.notes))
      this.setState({
          show: true,
          selectedPatient: patientDetails[idx]
      })
    }

    // Functionality for save&close button
    handleClose = () => {
      let savedNotes = JSON.parse(localStorage.getItem("savedNotes"))
      this.setState({
        notes: this.state.notesSaved ? this.state.notes : savedNotes,
        show: false,
        notesSaved: false
      });
    }

    // Functionality for clear button. 
    clearNote = () => {
      document.getElementById('notes').value = "";
    }

    // Functionality for save & close button. 
    saveNote = () => {
      this.setState({
        notesSaved: true
      }, () => {
        this.handleClose()
      })
    }

    // Functionality for delete draft of each note written.
    deleteNote = (idx) =>{
      let { selectedPatient, notes } = this.state;
      let dupNotes = notes;
      dupNotes[selectedPatient.First].splice(idx,1);
      this.setState({
        notes: dupNotes
      })
    }

    render() {
        const { show, selectedComponent, notes, selectedPatient } = this.state;
        return (
          <>
          <div className="d-flex align-items-center justify-content-center app-container">
          <h1 className="header">Genome Front End Coding Challenge Assessment</h1>
            <Table striped bordered hover className="tableData">
                <thead>
                  <tr>
                    <th>First</th>
                    <th>Last</th>
                    <th>DOB</th>
                    <th>Email</th>
                    <th>phoneNo</th>
                  </tr>
                </thead>
                <tbody>{this.renderBody()}</tbody>
            </Table>
            <Modal centered show={show} onHide={this.handleClose}>
                <div className="d-flex flex-column">
                    <div className="modalHeader m-4 mb-0">Edit Patient</div>
                      <ModalTabsComponent 
                        notes={notes}
                        firstName={selectedPatient.First}
                        selectedComponent={selectedComponent}
                        handleSelect={this.handleSelect}
                      />
                    {
                    selectedComponent && selectedComponent === "notes" ?
                        <NotesComponent 
                            notes={notes}
                            firstName={selectedPatient.First}
                            getNote={this.getNote}
                            addNote={this.addNote}
                            clearNote={this.clearNote}
                            deleteNote={this.deleteNote}
                            saveNote={this.saveNote}
                            />
                        :
                        <DetailsComponent selectedPatient={selectedPatient}/>
                    }
                </div>
            </Modal> 
          </div>
          </>
        )
    }
}

export default Home;
