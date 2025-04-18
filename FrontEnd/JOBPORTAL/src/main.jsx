import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return <App setAuth={setIsAuthenticated} />;
};

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById('root'));
root.render(<Root />);
