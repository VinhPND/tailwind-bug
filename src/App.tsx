import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { routes } from './routes/index';

// import Home from './pages/Home';
// import About from './pages/About';

const App: React.FC = () => {
  return (
    <Router basename="/basefe">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*  <Route index element={<Home />} />
          <Route path="about" element={<About />} />
           */}
          {routes.map((route) => {
            const Page = route.page;
            return <Route path={route.path} element={<Page />} />;
          })}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
