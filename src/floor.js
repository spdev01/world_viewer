import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components';
import Mob from './mob'
import {Row,Col,Container} from 'react-bootstrap';
import StrictModeDroppable from './StrictModeDroppable';
import uuid from 'react-uuid'

const Title = styled.h5`
padding: 8x`;

const MobList = styled.div`
padding:8px`;

const Img = styled.img`
  height:200px;
`;

const ParentDiv = styled.div`
margin:8px;
border:1px solid lightgrey;
border-radius: 2px;`;



export default class Floor extends Component {
  render() {
    return (
        <Col xs={3}>
            <Row>
            <Title>Floor: {this.props.floor.floor_no} </Title>

            </Row>
            <Row>
            <Title>
            Map: {this.props.floor.name} </Title>

            </Row>
            <Row>
                <Col xs={5}>
                    <Img src={'/maps/' + this.props.floor.name + '.png'}/>
                </Col>
                <Col xs={7}>
                    <StrictModeDroppable droppableId={String(this.props.floor.floor_no)} direction='vertical'>
                        {
                            (provided)=>(
                                <MobList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {this.props.floor.mobs.map( (m,i)=><Mob id={'s' + this.props.floor.floor_no + 't' + this.props.floor.floor_no + 'm' + m} key={m} mob_id={m} index={i}  showName={true} showLevel={true} thumbSize="40px"></Mob> )}
                                    {provided.placeholder}
                                </MobList>
                            )
                        }
                        
                    </StrictModeDroppable>
                </Col>
            </Row>
        </Col>
    )
  }
}
