import React from 'react'
import { Row, Column } from '../UI'
import styled from 'styled-components'


const Container = styled.div`
width: 100%;

margin-bottom: 20px;
background: #FFFFFF;
z-index: 1000;

@media only screen and (min-width: 768px) {
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);  
    padding: 20px 20px 30px 20px;
    margin-left: -20px;
}
`

interface iProps {
    leftColumn: any
    rightColumn: any
}

const RightColumnWrapper = styled.div`
padding: 20px 0 0 0;
@media only screen and (min-width: 992px) {
    padding: 0 0 0 40px; 
}
`

export default class CardDetailsComponent extends React.Component<iProps, any> {
    render() {

        let { leftColumn, rightColumn } = this.props

        return <Container>
            <Row>
                <Column md="6" lg="6">
                    {leftColumn}
                </Column>
                <Column md="6" lg="6">
                    <RightColumnWrapper>
                        {rightColumn}
                    </RightColumnWrapper>
                </Column>
            </Row>
        </Container>
    }
}

