import React from 'react'
import { connect } from 'react-redux'
import { iWork } from '../Api/interfaces'
import { Card, CardGrid } from '@vkontakte/vkui'
import { Row, Column, Title, SmallText } from './UI'
import styled from 'styled-components'
// import { CardGrid, Card } from '@vkontakte/vkui'


interface iProps {
    works: iWork[]
}

type iTemplatesType = 'horizontal' | 'small_vertical' | 'big_vertical'

class PortfolioComponent extends React.Component<iProps, any> {
    render() {

        const templates = (type: iTemplatesType, work: iWork) => {
            let url = work.images[0]['url'];
            let StyledCard = styled(Card)`
                background: none;
                border-radius: 0px;
            `

            let caption = <>
                <Title level="3">{work.exercise ? work.exercise.title : ''}</Title>
                <SmallText>Тут будет оценка</SmallText>
            </>
            switch (type) {
                case 'horizontal':
                    return <StyledCard size="l" key={work.work_id}>
                        <img src={url} width="100%" alt="" />
                        {caption}
                    </StyledCard>
                case 'small_vertical':
                    return <StyledCard size="m" key={work.work_id} style={{height: '550px'}}>
                        <div style={{
                            background: `url(${url})`,
                            width: '100%',
                            height: '500px',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}></div>

                        {caption}
                    </StyledCard>
                case 'big_vertical':
                    return <StyledCard size="l" key={work.work_id}>
                        <Row>
                            <Column md="8" lg="8">
                                <img src={url} width="100%" alt="" />
                            </Column>
                            <Column md="4" lg="4">
                                {caption}
                            </Column>
                        </Row>

                    </StyledCard>
                default:
                    return <StyledCard size="l" key={work.work_id}>
                        <img src={url} width="100%" alt="" />
                    </StyledCard>
            }
        }

        // const sortWorks = (works: iWork[]) => {
        //     works = works.filter(el => el.images[0])

        //     function chunkArray(myArray, chunk_size) {
        //         var index = 0;
        //         var arrayLength = myArray.length;
        //         var tempArray: [][] = [];

        //         for (index = 0; index < arrayLength; index += chunk_size) {
        //             let myChunk = myArray.slice(index, index + chunk_size);
        //             // Do something if you want with the group
        //             tempArray.push(myChunk);
        //         }

        //         return tempArray;
        //     }

        //     let smalls: any[] = works.filter(work => {
        //         let img = work.images[0]
        //         if (img.width < img.height) return true
        //     })

        //     smalls = chunkArray(smalls, 2)

        //     let larges = works.filter(work => {
        //         let img = work.images[0]
        //         if (img.width >= img.height) return true
        //     }).map(el => {
        //         el['size'] = "l"
        //         return el
        //     })


        //     return larges
        // }

        // let bunches = sortWorks(this.props.works)

        // let renderCards = (bunch: iWork[]) => {
        //     return bunch.map((el: any) => <Card key={el.work_id} size={el.size ? el.size : 'm'} >
        //         <img src={el.images[0]['url']} alt="" />
        //     </Card>)
        // }

        // return bunches.map((bunch, i) => {
        //     return <CardGrid key={i}>

        //     </CardGrid>
        // })

        let renderCards = this.props.works.map((work, i) => {
            let horizontal = [0, 4, 8]
            let small_vertical = [1, 2, 5, 6, 9, 10]
            let big_vertical = [3, 7, 11]
            let type: iTemplatesType = 'horizontal'
            if (horizontal.indexOf(i) !== -1) type = 'horizontal'
            if (big_vertical.indexOf(i) !== -1) type = 'big_vertical'
            if (small_vertical.indexOf(i) !== -1) type = 'small_vertical'
            return templates(type, work)
        })

        return <CardGrid>
            {renderCards}
        </CardGrid>
    }
}





const mapStateToProps = (state: any) => {
    return {
        works: state.app.works
    }
}

export default connect(mapStateToProps)(PortfolioComponent)