
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Carousel from './sections/carousel/carousel'
import WallOfMusic from './sections/wallOfMusic/wallOfMusic';
import GetRecommendations from './sections/getRecommendations/getRecommendations';
import SavedPlaylists from './sections/savedPlaylists/savedPlaylists';
import Login from './sections/login/login';
import SignUp from './sections/signUp/signUp';

import LandingPage from './sections/landingPage/landingPage';

function App() {
  return (
    <div className="App">
    <Router>
    <Switch>
      <Route path='/savedPlaylists'>
        <SavedPlaylists />
      </Route>
      <Route path='/getRecommendations'>
        <GetRecommendations />
      </Route>
      <Route path='/wallOfMusic'>
        <WallOfMusic />
      </Route>
      <Route path='/signUp'>
        <SignUp />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/'>
        <LandingPage />
      </Route>
    </Switch>
    </Router>
    </div>
  );
}

export default App;
