import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { onClickDropZone, onExitButtonClicked } from './actions'
import { SmallText, Row, Column, Title, Text, Link, buttonStyle } from '../UI'
import CardDetailsComponent from '../CardDetailsComponent/CardDetailsComponent'
import { iExercise, iUser, iRubric, iWork } from '../../Api/interfaces'
import { videoView } from '../VideoInstruction'
import { TimerView } from '../components'
import { Spinner } from '@vkontakte/vkui'


interface iProps {
    user: iUser
    rubric: iRubric
    exercise: iExercise
    works: iWork[]
    isLoading?: boolean
    onClickDropZone(event: any, exercise_id: string, user: iUser, rubric: iRubric, works: iWork[], cards: any[]): void
    onExitButtonClicked(exercise: iExercise, user: iUser, rubric: iRubric, works: iWork[], cards: any[]): void
    cards: any[]
}

const DropZone = styled.label`
transition:border 300ms ease;
display:block; 
cursor:pointer;
text-align:center
background: #FFF8F5;
border: 1px dashed #FFAA7B;
box-sizing: border-box;
width: 100%;
height: 400px;
margin-top: 20px;
margin-bottom: 10px;
`

const Input = styled.input`
outline:0;
opacity:0;
pointer-events:none;
user-select:none;
display: none;
`

const TimerZone = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-end;
margin: 14px 0px;
`

const UploadButton = styled.label`
${buttonStyle}
background: #FF5C00;
margin-top: 4px;
display: block;
`


class UploadWorkComponent extends React.Component<iProps, any> {

    state = {
        preCancel: false
    }

    render() {
        let { onClickDropZone, exercise, onExitButtonClicked, user, rubric, works, cards, isLoading } = this.props
        let theme = exercise.theme

        const leftColumn = (<>

            <TimerZone>
                <div style={{ maxWidth: '200px' }}>
                    <TimerView startTime={exercise.started_time || ''} />
                </div>
                <div style={{ maxWidth: '250px' }}>
                    <SmallText>16:9, JPEG или PNG, 1000px</SmallText>

                    <UploadButton>
                        <span>+ Загрузить макет</span>
                        <Input type="file" onChange={(e) => onClickDropZone(e, exercise.exercise_id, user, rubric, works, cards)} />
                    </UploadButton>
                </div>
            </TimerZone>


            <DropZone>
                {isLoading ? <Spinner size="medium" /> : null}
                <Input type="file" onChange={(e) => onClickDropZone(e, exercise.exercise_id, user, rubric, works, cards)} />
            </DropZone>

            <Row>
                <Column md="5" lg="5"><SmallText><Link onClick={() => this.setState({ preCancel: true })}>Выйти из задания</Link><br />Таймер сбросится и задание изменится</SmallText></Column>
                <Column md="7" lg="7">{this.state.preCancel ? <SmallText>Точно выйти?&nbsp;&nbsp;<Link onClick={() => onExitButtonClicked(exercise, user, rubric, works, cards)}>Выйти</Link>&nbsp;&nbsp;<Link onClick={() => this.setState({ preCancel: false })}>Остаться</Link></SmallText> : null}</Column>
            </Row>
        </>)

        const rightColumn = (<>
            <Title level="2">{exercise.title || 'Задание'}</Title>
            <Text>{exercise.desc}</Text>
            {theme ? videoView(theme.instruction_video_id) : null}
        </>)

        return <CardDetailsComponent leftColumn={leftColumn} rightColumn={rightColumn} />
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.app.user,
        rubric: state.app.rubric,
        exercise: state.app.activeExercise,
        works: state.app.works,
        isLoading: state.upload.isLoading,
        cards: state.themeSelector.cards
    }
}

export default connect(mapStateToProps, { onClickDropZone, onExitButtonClicked })(UploadWorkComponent)