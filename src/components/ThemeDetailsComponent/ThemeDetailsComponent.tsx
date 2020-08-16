import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { iExercise, iUser, iWork, iRubric } from '../../Api/interfaces'
import { Text, Title, Button, SmallText, buttonStyle } from '../UI'
import CardDetailsComponent from '../CardDetailsComponent/CardDetailsComponent'
import { onStartButtonClick, onClickDropZone, onEditClick } from './actions'
import { videoView } from '../VideoInstruction'
import PlusIcon from '../../images/plus.svg'
import HotIcon from '../../images/hot.svg'
import ColdIcon from '../../images/cold.svg'
import waitIcon from '../../images/wait.svg'
import { TimerView } from '../components'
import { FeebackView } from '../FeedbackView/FeedbackView'

interface iProps {
    user: iUser
    activeCard: any
    activeExercise: iExercise
    onStartButtonClick(params: { theme_id: string, user_id: string }): void
    isSending?: boolean
    works: iWork[]
    rubric: iRubric
    onEditClick(exercise: iExercise): void
}

interface iWorkContainerProps {
    width?: number;
    height?: number;
}

const WorkContainer = styled.div<iWorkContainerProps>`
  width: ${({ width }) => width ? width + 'px' : '100%'};
  height: ${({ height }) => height ? height + 'px' : '400'};
`;


const Wrapper = styled.div`
margin-top: 64px;
display: flex; 
flex-flow: wrap;
align-items: flex-end;
`

let EmptyWorkContainer = styled(WorkContainer)`
border: 1px dashed #7F93F4;
box-sizing: border-box;
width: 100%;
height: 400px;
background: #F5F9FF; 
&::after {
    content: '';
    background-size: 70px 70px;
    background-image: url(${PlusIcon});
    background-repeat: no-repeat;
    width: 70px;
    height: 70px;
    display: block;
    position: relative;
    right: -45%;
    top: 40%;
}
`

const CardTitle = styled(Title)`
margin-bottom: 10px;
`
const CardText = styled(Text)`
margin-bottom: 20px;
`

const CardButton = styled(Button)`
margin-bottom: 50px;
`


const TimerZone = styled.div`
order: 1;
max-width: 150px;
`
const ButtonZone = styled.div`
order: 3;

@media only screen and (min-width: 786px) {
    order: 2;
    margin-left: auto;
    text-align: right;
}
`

const ImageZone = styled.div`
order: 2;
margin: 14px 0px 10px 0px;
width: 100%;
@media only screen and (min-width: 786px) {
    order: 3;
}
`

// const LinkZone = styled.div`
// order: 4;
// width: 100%;
// `

const UploadButton = styled(Button)`
${buttonStyle}
margin-top: 4px;
display: block;
`

// const Input = styled.input`
// outline:0;
// opacity:0;
// pointer-events:none;
// user-select:none;
// display: none;
// `

const WaitIcon = styled.img`
@media only screen and (max-width: 786px) {
    display: block;
}
`
class ThemeDetailsSelector extends React.Component<iProps, any> {
    render() {

        const { activeCard, onStartButtonClick, user, isSending } = this.props

        let work = activeCard.work
        let theme = activeCard.theme

        const imageView = () => {
            let image = work ? work.images[0] : null
            if (image && image['thumbnails']) {
                image = image['thumbnails']['large'] ? image['thumbnails']['large'] : image
            }
            return image ? <img src={image['url']} width="100%" alt='' /> : null
        }

        const timerView = (work) => {
            if (!work.exercise || !work.exercise.started_time) return null
            return <TimerZone>
                <TimerView startTime={work.exercise && work.exercise.started_time ? work.exercise.started_time : ''} finishedTime={work.exercise.finished_time} />
            </TimerZone>
        }

        const feedbackView = (work: iWork) => {
            if (!work) return <EmptyWorkContainer />

            const getIcon = (text_rate: string) => {
                if (text_rate === 'Горячо') return HotIcon
                return ColdIcon
            }
            return <>
                <Title level="2">{!work.text_rate ? <><WaitIcon src={waitIcon} style={{ width: '30px' }} /> Загружено на проверку</> : <><WaitIcon src={getIcon(work.text_rate)} style={{ width: '30px' }} /> {work.text_rate}</>}</Title>
                <Text >Разборы по понедельникам</Text>
                {work.votes ?
                    work.votes.map((vote, i) => {
                        return <FeebackView key={i} feedbacker={vote.feedbacker} votes={vote.items} />
                    })
                    : null
                }

                <Wrapper>
                    {timerView(work)}
                    {!work.text_rate ? <ButtonZone>
                        <SmallText>Таймер изменится</SmallText>
                        <UploadButton onClick={() => work.exercise ? this.props.onEditClick(work.exercise) : null}>
                            <span>+ Загрузить другой макет</span>
                        </UploadButton>
                    </ButtonZone> : null}
                    <ImageZone>
                        {imageView()}
                    </ImageZone>
                    {/* <LinkZone><Text><Link type="dashed" color="destroy">Удалить</Link></Text></LinkZone> */}
                </Wrapper>
            </>
        }


        const exerciseView = () => {
            if (!work || !work.exercise) return null
            return <><Title level="3">Задание</Title>
                <CardText>{work.exercise.desc}</CardText></>
        }
        const MainView = () => {
            let content = <>
                <CardTitle level={activeCard.work ? "3" : "2"}>{activeCard.theme.title}</CardTitle>
                <CardText>{activeCard.theme.desc}</CardText>
                {exerciseView()}
                {!work ? <CardButton onClick={() => onStartButtonClick({ theme_id: theme.theme_id, user_id: user.user_id })} disabled={isSending}>{isSending ? `Подбираем задание…` : `Начать выполнение`}</CardButton> : null}
                {videoView(theme.instruction_video_id)}
            </>
            let leftColumn = <>{feedbackView(work)}</>
            return <CardDetailsComponent rightColumn={content} leftColumn={leftColumn} />
        }

        return MainView()
    }
}

const mapStateToProps = (state: any) => {

    return {
        user: state.app.user,
        isLoading: state.themeSelector.isLoading,
        themes: state.themeSelector.themes,
        activeCard: state.themeSelector.activeCard,
        rubric: state.app.rubric,
        activeExercise: state.themeSelector.activeExercise,
        works: state.app.works,
        isSending: state.upload.isLoading
    }
}

export default connect(mapStateToProps, { onStartButtonClick, onClickDropZone, onEditClick })(ThemeDetailsSelector)