import PropTypes from 'prop-types'
import React, { Component } from 'react'
import mobData from './all_mobs.json'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'
import {Row,Col,Container} from 'react-bootstrap';


const BigContainer = styled.div`
  border:1px solid lightgrey;
  padding: 5px;
  border-radius:5px;
  margin-top: 15px;
  margin-left:15px;
  margin-right:15px;
  margin-bottom:15px;
  
`;




export default class Mob extends Component {
  sliced_mob_id = this.props.mob_id.substr(-4);
  curr_mob = mobData.find(x=> x.id === this.sliced_mob_id)

  render() {
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {
          (provided)=>(
            <Container 
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
                <div className="">
                  <img src={'/mobs/' + this.curr_mob.id + '.png'} style={{height:this.props.thumbSize}} alt={this.curr_mob.name}/>
                  {
                    this.props.showLevel && 'lvl:' + this.curr_mob.level

                  }                  
                  {
                    this.props.showName && this.curr_mob.name

                  }
                   
                </div>
                
          </Container>
          )
        }

      </Draggable>
      );
  }
}
