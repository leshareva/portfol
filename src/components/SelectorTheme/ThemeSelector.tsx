import React from 'react'
import { connect } from 'react-redux'
import { iUser, iWork, iRubric } from '../../Api/interfaces'
import { init, onElementClick } from './actions'
import ThemeDetailsComponent from '../ThemeDetailsComponent/ThemeDetailsComponent'
import styled from 'styled-components'
import { SmallText } from '../UI'
import HotIcon from '../../images/hot.svg';
import PlusIcon from '../../images/plus.svg';
import WaitIcon from '../../images/wait.svg';
import ColdIcon from '../../images/cold.svg';
import CornerIcon from '../../images/corner.svg';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { isMobile } from 'react-device-detect'
import Modal from '../Modal/Modal'



interface iProps {
    init(rubric: iRubric, works: iWork[], work_id?: string): void
    onElementClick(card: any): void
    rubric: iRubric
    activeCard?: any
    user: iUser
    cards: Array<Array<any>>
    works: iWork[]
    filter?: any
    initialized?: boolean
}




const ThemeGroup = styled.div`
display: flex; 
height: 80px;
margin-right: 40px;
`

interface iCardProps {
    selected?: boolean
}

const Card = styled.div<iCardProps>`
cursor: pointer;
width: 70px;
height: 70px;
background-repeat: no-repeat;
margin: 4px 8px 4px 0px;
background-size: cover;
position: relative;
${({ selected }) => {
        if (selected) {
            return `
            @media only screen and (min-width: 768px) {
                    &::before {
                    position: absolute;
                    content: url(${CornerIcon});
                    bottom: -2em;
                    left: 0%;
                    z-index: 2;
                }
            }`
        } else {
            return ''
        }
    }}

`

const WorkCard = styled(Card) <{ icon?: string }>`
&::after {
    content: ${({ icon }) => icon ? 'url(' + icon + ')' : ''};
    bottom: -20px;
    position: absolute;
    left: 2px;
    width: 20px;
}
`

const EmptyCard = styled(Card)`
border: 1px dashed rgba(0, 71, 255, 0.5);
box-sizing: border-box;
&::after {
    content: '';
    background-size: 20px 20px;
    background-image: url(${PlusIcon});
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    display: block;
    position: relative;
    margin: auto;
    top: 40%;
}
`

const ArrowComponent = styled.div`
font-size: 20px;
cursor: pointer;
`

const LeftArrow = styled(ArrowComponent)`
padding: 10px;
margin-left: -40px;
`
const RightArrow = styled(ArrowComponent)`
padding-left: 10px;
`

class ThemeSelector extends React.Component<iProps, any> {
    componentDidMount() {
        if(!this.props.initialized) {
            this.props.init(this.props.rubric, this.props.works);
        }
    }
    render() {
        const { cards, activeCard } = this.props

        if (!cards) return <div>Загрузка…</div>

        const worksView = (bunch: any[]) => {
            return bunch.map((card: any) => {
                let check = activeCard && activeCard.key === card.key
                if (card.work) {
                    let work: iWork = card.work
                    let image = card.work.images[0]
                    if (card.work.images[0]['thumbnails']) {
                        image = card.work.images[0]['thumbnails']['large'] ? card.work.images[0]['thumbnails']['large'] : card.work.images[0]
                    }

                    let icon = HotIcon

                    if (!work.text_rate) icon = WaitIcon
                    if (work.text_rate === 'Холодно' || work.text_rate === 'Тепло') icon = ColdIcon
                    return <WorkCard icon={icon} selected={check} key={card.key} style={{ backgroundImage: `url(${image['url']})` }} onClick={() => this.props.onElementClick(card)} />
                } else {
                    return <EmptyCard selected={check} key={card.key} onClick={() => this.props.onElementClick(card)} />
                }


            })
        }

        // const emptyWork = (theme: iTheme) => <EmptyCard onClick={() => this.props.onElementClick(theme)}>+</EmptyCard>

        const themesList = () => {
            // if (activeExercise) return null
            return cards.map(bunch => {
                if (!bunch[0]) return <></>
                return <div key={bunch[0].theme.theme_id}>
                    <SmallText>{bunch[0].theme.title}</SmallText>
                    <ThemeGroup >
                        {worksView(bunch)}
                    </ThemeGroup>
                </div>
            }) || []
        }

        const selectedTheme = () => {
            if (!this.props.activeCard) return
            return isMobile ? <Modal body={<ThemeDetailsComponent />} /> : <ThemeDetailsComponent />
        }


        const ArrowLeft = <LeftArrow>←</LeftArrow>;
        const ArrowRight = <RightArrow>→</RightArrow>;

        return <>
                <ScrollMenu
                    data={themesList()}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}
                    innerWrapperStyle={{ display: 'flex', height: '120px' }}
                    clickWhenDrag={false}
                    hideSingleArrow={true}
                    alignCenter={false}
                    wheel={false}
                    scrollToSelected={true}
                    scrollBy={1}
                />


                {selectedTheme()}
            </>
    }
}

const mapStateToProps = (state: any) => {
    return {
        cards: state.themeSelector.cards,
        activeCard: state.themeSelector.activeCard,
        user: state.app.user,
        works: state.app.works,
        rubric: state.app.rubric,
        initialized: state.themeSelector.initialized
    }
}

export default connect(mapStateToProps, {init, onElementClick})(ThemeSelector)