import './App.css';
import floorData from './mob_map.json'
import { useState } from 'react';
import React from 'react';
import Floor from './floor';
import '@atlaskit/css-reset';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {Container,Col,Row} from 'react-bootstrap';

const TestContainer = styled.div`
  
`;


export default class App extends React.Component {
  state = floorData

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state[source.droppableId -1];
    const finish = this.state[destination.droppableId -1];


    if (start === finish) {
      console.log('move in the same place')

      const newMobIds = Array.from(start.mobs);
      newMobIds.splice(source.index, 1);
      newMobIds.splice(destination.index, 0, draggableId);

      console.log(this.state)

      const newFloor = {
        ...start,
        mobs: newMobIds,
      };

      const newState = {
        ...this.state,
        [newFloor.floor_no - 1]: newFloor,
        
      };

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.mobs);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      mobs: startTaskIds,
    };

    const finishMobs = Array.from(finish.mobs);
    finishMobs.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      mobs: finishMobs,
    };

    const newState = {
      ...this.state,
        [newStart.floor_no - 1]: newStart,
        [newFinish.floor_no  - 1]: newFinish,

    };
    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        // onDragStart={}
        // onDragUpdate={}
        onDragEnd={this.onDragEnd}
      >
        <Row className='floor-parent' style={{marginTop:'0px',marginLeft:'0px',marginRight:'0px',width: '100%'}}>
          {
            Array(100).fill().map( (x,floor_no) =>{
            const flr = this.state[floor_no]
            const mobsInFloor = flr.mobs
            return <Floor key={String(flr.floor_no)} floor={flr} mobs={flr.mobs} ></Floor>
      
          })
          }
      </Row>
      </DragDropContext>

    );
    
    
  }
}