import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { onClose } from './actions'
import closeIcon from '../../images/close.svg'

interface iModal {
    body: any
    show?: boolean
    onClose(): void
}

const BackDrop = styled.div`
    position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 50;
      z-index: 5000;
      background-color: rgba(0,0,0,0.3);
      overflow: scroll;
`

const ModalBody = styled.div`
background-color: #fff;
border-radius: 5px;
max-width: 500px;
min-height: 300px;  
margin: 0 auto;
padding: 20px 16px;
z-index: 5001;
margin-top: 20vh;
`

const CloseButton = styled.img`
width: 16px;
display: block;
margin-left: auto;
`

class Modal extends React.Component<iModal, any> {
    render() {
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        return (
            <BackDrop >
                <ModalBody >
                    <CloseButton src={closeIcon} onClick={this.props.onClose} />
                    <div style={{marginTop: '-16px'}}>{this.props.body}</div>
                </ModalBody>
            </BackDrop>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        show: state.modal.show
    }
}


export default connect(mapStateToProps, { onClose })(Modal)
