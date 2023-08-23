import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const Main = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

export default Main;

if (process.env.NODE_ENV !== 'test') {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(<Main />);
}