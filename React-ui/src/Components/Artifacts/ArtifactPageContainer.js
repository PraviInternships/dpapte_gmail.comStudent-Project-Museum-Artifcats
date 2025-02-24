// ArtifactPageContainer.js
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ArtifactPage from './ArtifactPage';

const ArtifactPageContainer = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/artifacts/:id" component={ArtifactPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default ArtifactPageContainer;
