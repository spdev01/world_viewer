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

const Img = styled.img`
width:50px;
`;


export default class Mob extends Component {
  curr_mob = mobData.find(x=> x.id === this.props.mob_id)

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
                <Row className="d-flex flex-row">
                  <Img src={'/mobs/' + this.curr_mob.id + '.png'}/>
                  
                  level:{this.curr_mob.level} <b>{this.curr_mob.name}</b>
                </Row>
                
          </Container>
          )
        }

      </Draggable>
      );
  }
}
