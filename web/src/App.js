import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { SocketProvider } from './components/SocketProvider';
import AppRoutes from './routes/AppRoutes';

const App = () => {
    return (
    
            <SocketProvider>
                <Router> 
                    <div className="App">
                        <AppRoutes />
                    </div>
                </Router>
            </SocketProvider>
    );
};

export default App;
