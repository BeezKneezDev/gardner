// src/App.jsx
import React from 'react';
import PostList from './components/PostList';
import NewPost from './components/NewPost';

function App() {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white p-4">
      <h1 className="text-4xl">Beezkneez Kiwi Gardner</h1>
      </header>
      <main className="p-4">
        <NewPost />
        <PostList />
      </main>
    </div>
  );
}

export default App;
