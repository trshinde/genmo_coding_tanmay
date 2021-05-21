import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react';
import userImg from '../assets/images/default-user-image.png';


class AddNoteFeatureComponent extends Component {
    render() {
        const {notes} = this.props;
        return (
            <div>
                {
                    notes && notes.length > 0 &&
                    <>
                    <div className="m-4 mt-3">
                        <Comment.Group threaded>
                          {
                            notes && notes.map((item, index) => (
                              <Comment key={index}>
                                <Comment.Avatar as='a' src={userImg} />
                                <span 
                                  className="deleteButton" 
                                  style={{float:'right'}} 
                                  onClick={()=>this.props.deleteNote(index)}>
                                        Delete Draft
                                </span>
                                <Comment.Content>
                                  <Comment.Author as='a'>Test User</Comment.Author>
                                  <Comment.Text>
                                    <div>{item.timestamp}</div>
                                    <div>{item.note}</div>
                                  </Comment.Text>
                                </Comment.Content>
                                {
                                  notes[index+1] &&
                                  <Comment.Group>
                                  </Comment.Group>
                                }
                              </Comment>
                            ))
                          }
                          </Comment.Group>
                    </div> 
                    <div>
                    <div onClick={this.props.saveNote} className="saveClosePartition">
                        <button className="buttonSaveClose">Save & Close</button>
                    </div>
                    </div>
                    </>
                 }
            </div>
        )
    }
}

export default AddNoteFeatureComponent;