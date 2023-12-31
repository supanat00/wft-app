import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, CreatePost, TranTexts, TextsInput, LoginPage, Showcase } from './page';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/trantexts" element={<TranTexts />} />
          <Route path="/texts-input" element={<TextsInput />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/showcase" element={<Showcase />} />
        </Routes>
      </main>      

    </BrowserRouter>
  );
};

export default App;
