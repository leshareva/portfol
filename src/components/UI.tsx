import styled from 'styled-components'


export const buttonStyle = `border: none;
background: #015EFF;
border-radius: 4.2px;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 120%;
color: #FFFFFF;
padding: 7px 12px;
cursor: pointer;

&:disabled {
    opacity: 0.2;
}
`


export const Button = styled.button`
${buttonStyle}
`

//layout
export const Row = styled.div`
    &::after {
        content: "";
        clear: both;
        display: table;
    }
`;


export interface iColumn {
    xs?: string
    sm?: string
    md?: string
    lg?: string
}

function getWidthString(span: string) {

    let width = +span / 12 * 100;
    return `width: ${width}%;`;
}

export const Column = styled.div<iColumn>`
float: left;
${ ({ xs }) => (xs ? getWidthString(xs) : "width: 100%")};

@media only screen and (min-width: 768px) {
    ${ ({ sm }) => sm && getWidthString(sm)};
}

@media only screen and (min-width: 992px) {
    ${ ({ md }) => md && getWidthString(md)};
}

@media only screen and (min-width: 1200px) {
    ${ ({ lg }) => lg && getWidthString(lg)};
}
`




//Typography

interface iTitle {
    level: "1" | "2" | "3"
}

function getLevelStyle(level: string) {
    if (level === "1") {
        return `
        font-weight: 900;
        font-size: 56px;
        line-height: 68px;
        `
    }

    if (level === "2") {
        return `
        font-weight: 800;
        font-size: 32px;
        line-height: 110%;
        `
    }

    if (level === "3") {
        return `
        font-weight: bold;
        font-size: 24px;
        line-height: 29px;
`
    }
};

export const Title = styled.h1<iTitle>`
font-family: Montserrat;
font-style: normal;
${({ level }) => getLevelStyle(level)}
`

export const Header = styled.h2`
font-family: Montserrat;
font-style: normal;
font-weight: 800;
font-size: 32px;
line-height: 110 %;
font-feature-settings: 'tnum' on, 'lnum' on;
color: #000000;
`

export const Text = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 120 %;
font-feature-settings: 'tnum' on, 'lnum' on;
`

export const SmallText = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 120%;
font-feature-settings: 'tnum' on, 'lnum' on;
`

interface iLinkProps {
    color?: 'destroy',
    type?: 'dashed'
}

export const Link = styled.a<iLinkProps>`
color: ${({ color }) => color && color === 'destroy' ? '#FF1F1F' : '#092DEA'};
cursor: pointer;
${({type})=>type&&type==='dashed' ? 'border-bottom: 1px dashed #FF1F1F' : null} 
`
