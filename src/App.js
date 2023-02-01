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
import uuid from 'react-uuid'

export default class App extends React.Component {

  state = 
  {
    floorState:floorData,
    mobBarState:mobData
  }

  mobBarState = mobData  
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

    const start = this.state.floorState[source.droppableId -1];
    const finish = this.state.floorState[destination.droppableId -1];


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
        ...this.state.floorState,
        [newFloor.floor_no - 1]: newFloor,
        
      };

      this.setState({...this.state.mobBarState,floorState:newState});
      return;
    }

    if(source.droppableId === "999" && destination.droppableId !== "999"){

      const src_mob_id = draggableId.substr(-4);
      
      const new_mod_id = 's0t' + destination.droppableId + src_mob_id

      console.log(new_mod_id)
      const finishMobs = Array.from(finish.mobs);
      finishMobs.splice(destination.index, 0, new_mod_id);
      const newFinish = {
        ...finish,
        mobs: finishMobs,
      };

      const newState = {
        ...this.state.floorState,
          [newFinish.floor_no  - 1]: newFinish,

      };      
      this.setState({...this.state.mobBarState,floorState:newState});

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
        ...this.state.floorState,
          [newStart.floor_no - 1]: newStart,
          [newFinish.floor_no  - 1]: newFinish,

      };      
      this.setState({...this.state.mobBarState,floorState:newState});
    }
    else
    {
      const newState = {
        ...this.state.floorState,
          [newStart.floor_no - 1]: newStart

      };      
      this.setState({...this.state.mobBarState,floorState:newState});

    }

  };

  onFilter = (event) =>{
    const filter_text = event.target.value
    const newMobBar = this.mobBarState.filter( o=> o.name.includes(filter_text) )
    this.setState({...this.state.floorState,mobBarState:newMobBar})
  }

  render() {
    return (
      <DragDropContext
        // onDragStart={}
        // onDragUpdate={}
        onDragEnd={this.onDragEnd}
      >
        
        <div class="row sticky-top bg-white" style={{border:'1px solid lightgrey',height:'80px',marginBottom:'20px',paddingTop:'10px'}}>
                <div class="col-md-2" style={{borderRight:'1px solid lightgrey',height:'70px'}}>
                  <input style={{width:'100%'}} onChange={this.onFilter}/>
                </div>
                <StrictModeDroppable droppableId={"999"} direction='horizontal'>
                          {
                              (provided)=>(
                                <div class="col-md-9 container" 
                                style={{display:'flex',overflowY:'hidden',overFlowX:'auto',height:"70px"}} 
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                  
                                  {/* {mobData.map( (m,i)=> <h3>{m.id}</h3> )} */}
                                  {this.state.mobBarState.sort( (a,b) => (parseInt(a.level) > parseInt(b.level)) ? 1:-1).map(
                                    
                                    (m,i)=> <Mob id={'s0t0m' + m.id} key={m.id} mob_id={m.id} index={i}  showName={false} showLevel={false} thumbSize='35px'></Mob> )}
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
            const flr = this.state.floorState[floor_no]
            const mobsInFloor = flr.mobs
            return <Floor key={String(flr.floor_no)} floor={flr} mobs={flr.mobs} ></Floor>
      
          })
          }
      </Row>
      </DragDropContext>

    );
    
    
  }
}