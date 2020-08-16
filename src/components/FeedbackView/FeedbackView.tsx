import React from 'react'
import { iUser } from '../../Api/interfaces'
import styled from 'styled-components'
import { SmallText, Text } from '../UI'

interface iFeebackViewProps {
    feedbacker: iUser
    votes: {
        amount: number
        criteria_id: string
        title: string
    }[]
}


const Bubble = styled.div`
position: relative;
    padding: 15px;
    margin: 20px 0 3em;
    text-align: left;
    color: #000;
    background: #e8e8e8;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    max-width: 300px;

&:before {
    content: "";
    position: absolute;
    top: -20px;
    left: 20%;
    width: 100px;
    height: 20px;
    margin: 0 0 0 -50px;
    background: #e8e8e8;
}

&:after {
    content: "";
    position: absolute;
    top: -20px;
    left: 0;
    width: 10%;
    height: 20px;
    background: #fff;
    -webkit-border-bottom-right-radius: 15px;
    -moz-border-radius-bottomright: 15px;
    border-bottom-right-radius: 15px;
}

& > :first-child:before {
    content: "";
    position: absolute;
    top: -20px;
    right: 0;
    width: 90%;
    height: 20px;
    background: #fff;
    -webkit-border-bottom-left-radius: 15px;
    -moz-border-radius-bottomleft: 15px;
    border-bottom-left-radius: 15px;
}

`

export class FeebackView extends React.Component<iFeebackViewProps, any> {
    render() {
        const { feedbacker, votes } = this.props


        function firstLetterLowerCase(string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
          }


        return <div>
            {/* <FeedbackTitle level="2">{work.exercise ? work.exercise.title : null}</FeedbackTitle> */}
            <Bubble><div>
                <Text>Оценил {feedbacker.name}{feedbacker.about ? `, ${firstLetterLowerCase(feedbacker.about)}` : ''}</Text><br />
                {votes.map((vote, i) => {
                    let label = vote.amount === 3 ? `✓ ${vote.title}` : `✗ ${vote.title}`
                    return <SmallText key={i} style={{ color: vote.amount === 3 ? '#17A500' : '#E7A600' }}>{label}</SmallText>
                })}
            </div></Bubble>
        </div>
    }
}