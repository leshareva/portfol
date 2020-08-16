
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ThemeSelector from './components/SelectorTheme/ThemeSelector'
import UploadWorkComponent from './components/ThemeDetailsComponent/UploadWorkComponent'
import ProtfolioComponent from './components/ProtfolioComponent'
import { init } from './actions'
import { iUser, iRubric, iExercise } from './Api/interfaces';
import { Title, Text, Link } from './components/UI'
import '@vkontakte/vkui/dist/vkui.css'
import './index.css'

interface IProps {
    type: 'web' | 'vk'
    vk_id?: number
    rubric_id?: string
    init(type: 'web' | 'vk', vk_id?: number, rubric_id?: string): void
    user: iUser
    rubric: iRubric
    activeExercise?: iExercise
    auth?: boolean
}

const Wrapper = styled.div`
  padding: 10px 40px;
  `
interface iExerciseWrapperProps {
    active?: boolean
}

const ExerciseWrapper = styled(Wrapper) <iExerciseWrapperProps>`
  background: ${({ active }) => active ? '#FFEFE5' : '#E6EFFF'} ;
  `

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;  
  `
const Logo = styled.a`
  color: #015EFF;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  text-decoration: none;
  `

const RubricDescription = styled(Text)`
  max-width: 500px;
  margin-top: 20px;
  margin-bottom: 20px;
  `

class AppComponent extends React.Component<IProps, any> {
    componentDidMount() {
        this.props.init(this.props.type, this.props.vk_id, this.props.rubric_id)
    }
    render() {
        let { user, rubric, activeExercise, auth } = this.props

        if (!user) return <div>Загрука…</div>

        const themesView = () => {
            if (!rubric) return null
            return !activeExercise ? < ThemeSelector /> : <UploadWorkComponent />
        }


        return <>
            <ExerciseWrapper active={auth && activeExercise ? true : false}>
                <Header>
                    <Logo href="/">Лин Портфолио</Logo>
                    <div>{auth ? user.name : <Link>Войти</Link>}</div>
                </Header>
                <Text>Портфолио</Text>
                <Title level="2">{user.name}</Title>
                <RubricDescription>{rubric ? rubric.desc : null}</RubricDescription>
                {auth ? themesView() : null}
            </ExerciseWrapper>
            <ProtfolioComponent />
        </>
    }
}


const mapStateToProps = (state: any) => {
    return {
        user: state.app.user,
        rubric: state.app.rubric,
        activeExercise: state.app.activeExercise,
        auth: state.app.auth
    }
}

export default connect(mapStateToProps, { init })(AppComponent)
