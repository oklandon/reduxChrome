import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import Injectable from './Injectable';


const proxyStore = new Store({ portName: 'JIDPort' });

if (document.querySelector('#reactApp')) {
    proxyStore.dispatch({
        type: 'POPUP/TOGGLE'
    });
}
else {
    let anchor = document.createElement('div');
    anchor.id = 'reactApp';

    document.body.insertBefore(anchor, document.body.childNodes[0]);

    render(
        <Provider store={proxyStore}><Injectable /></Provider>,
        document.getElementById('reactApp')
    );
}
