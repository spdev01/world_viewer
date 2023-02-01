import './App.css';
import floorData from './mob_map.json'
import mobData from './all_mobs.json'
import React from 'react';
import Floor from './floor';
import '@atlaskit/css-reset';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {Button, Row} from 'react-bootstrap';
import StrictModeDroppable from './StrictModeDroppable';
import { FaTrashAlt } from 'react-icons/fa';
import Mob from './mob'


export default class App extends React.Component {
  state = floorData

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    console.log(result)

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

      console.log(newMobIds)

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


    if (destination.droppableId !== "999")
    {
      
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
    }
    else
    {
      const newState = {
        ...this.state,
          [newStart.floor_no - 1]: newStart

      };      
      this.setState(newState);

    }

  };

  render() {
    return (
      <DragDropContext
        // onDragStart={}
        // onDragUpdate={}
        onDragEnd={this.onDragEnd}
      >
        
        <div class="row sticky-top bg-white" style={{border:'1px solid lightgrey',height:'80px',marginBottom:'20px',paddingTop:'10px'}}>
                <div class="col-md-2" style={{borderRight:'1px solid lightgrey',height:'70px'}}>Search</div>
                <StrictModeDroppable droppableId={"999"} direction='horizontal'>
                          {
                              (provided)=>(
                                <div class="col-md-9 container" 
                                style={{display:'flex',overflowY:'hidden',overFlowX:'auto',height:"70px"}} 
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                  
                                  {/* {mobData.map( (m,i)=> <h3>{m.id}</h3> )} */}
                                  {mobData.sort( (a,b) => (parseInt(a.level) > parseInt(b.level)) ? 1:-1).map(
                                    
                                    (m,i)=> <Mob id={m.id} key={m.id} mob_id={m.id} index={i}  showName={false} showLevel={false} thumbSize='35px'></Mob> )}
                                  {provided.placeholder}
                                </div>
                              )
                          }
                          
                      </StrictModeDroppable>

                  

                <div class="col-md-1" style={{borderLeft:'1px solid lightgrey',height:'60px',textAlign:'center'}}>
                  <StrictModeDroppable droppableId={"999"} direction='vertical'>
                          {
                              (provided)=>(
                                <div ref={provided.innerRef}
                                {...provided.droppableProps}>
                                  
                                  <FaTrashAlt style={{height:'60px'}}
                                      
                                  >
                                  {provided.placeholder}
                                      
                                  </FaTrashAlt>
                                </div>
                              )
                          }
                          
                      </StrictModeDroppable>
                </div>
        </div>
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