// App.js
import styles from './styles.module.css';
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';
import React from 'react';
import ArtifactPageContainer from './ArtifactPageContainer';

const App = () => {
    return (
        <div className="max-w-md mx-auto p-4 bg-white border border-gray-200 rounded">
            <div className={styles.container}>
                <ArtifactPageContainer />
            </div>
        </div>
    );
};

export default App;
