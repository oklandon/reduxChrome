import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';


class Injectable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowHeight: 590,
        };
    }

    componentWillMount() {
        this.state = {
            windowHeight: window.innerHeight,
        };
    }

    render() {
        const kf = keyframes`
            to {
                top: 0;
                right: 0;
                opacity: 1;
                transform: scale(${this.props.popupOn ? 1 : 0});
            }
        `;

        const StyledDiv = styled.div`
            opacity: 0;
            position: fixed;
            transform-origin: 100% 0;
            transform: scale(0);
            top: -500px;
            z-index: 2147483647;
            animation: ${kf} 0.7s ease-out forwards;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px;
            border-left: 1px solid #f2f2f2;
            background-color: #F6F6F6;
        `;

        return (
            <StyledDiv id='injectable'>
                <iframe
                    name            = 'ext'
                    src             = { chrome.extension.getURL('src/action/popup/popup.html') }
                    height          = { this.state.windowHeight }
                    width           = '420'
                    frameBorder     = '0'
                    allowFullScreen = 'true'
                >
                </iframe>
            </StyledDiv>
        );
    }
}

export default connect(state => ({ popupOn: state.popupOn }))(Injectable);
