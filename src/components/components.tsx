import React from 'react'
import moment from 'moment-timezone'
import { Title, SmallText } from './UI'
import styled from 'styled-components'
import Timer from 'react-compound-timer'





interface iTimerProps {
    startTime: string
    finishedTime?: string
    caption?: string
}


export class TimerView extends React.Component<iTimerProps, any> {


    render() {

        const TimerTitle = styled(Title) <{ active?: boolean }>`
            color: ${({ active }) => active ? '#FF5C00' : '#000000'};
        `

        const TimerZone = styled.div`
            order: 1;
            max-width: 200px;
        `

        let initTime = (startTime: string, finishedTime?: string) => {
            return (finishedTime ? moment(finishedTime).valueOf() : moment().valueOf()) - moment(startTime).valueOf()
        }

        let actived = this.props.finishedTime ? false : true

        return <TimerZone>
            <TimerTitle level="2" active={actived}>
                <Timer
                    formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
                    initialTime={initTime(this.props.startTime, this.props.finishedTime)}
                    startImmediately={actived}
                >
                    {({ timerState }) => (
                        <React.Fragment>
                            <div>
                                <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
                            </div>
                        </React.Fragment>
                    )}
                </Timer>
            </TimerTitle>
            <SmallText>Быстрее, чем 36% дизайнеров в Лине</SmallText>
        </TimerZone>
    }
}

