// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import TopBar from './components/TopBar';  // Import the TopBar component
import FavoritesList from './components/FavoritesList';
import { useSelector } from 'react-redux';

function App() {
  const recipes = useSelector((state) => state.recipe.recipes);
  return (
    <div className='bg-[whitesmoke] h-screen'>
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TopBar isDetailPage={false}>
                    <RecipeList recipes={recipes} isFavPage={false} />
                  </TopBar>
                </>
              }
            />

            <Route
              path="/recipe/:id"
              element={
                <>
                  <TopBar isDetailPage={true}><RecipeDetail /></TopBar></>}
            />
            <Route path="/favorites" element={
              <>
                <TopBar isDetailPage={true}>
                  <FavoritesList />
                </TopBar>
              </>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
