import './App.css'
import { useState, useEffect } from 'react';
import * as teamService from './services/teamService';
import * as playerService from './services/playerService';
import NavBar from './components/Navbar/Navbar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import { Routes, Route } from 'react-router';
import TeamList from './components/TeamList/TeamList';
import TeamForm from './components/TeamForm/TeamForm';
import TeamDetail from './components/TeamDetail/TeamDetail';
import PlayerList from './components/PlayerList/PlayerList';
import PlayerDetail from './components/PlayerDetail/PlayerDetail';
import PlayerForm from './components/PlayerForm/PlayerForm';



const App = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await teamService.teamIndex();
        setTeams(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPlayers = async () => {
      try {
        const data = await playerService.playerIndex();
        setPlayers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeams();
    fetchPlayers();
  }
    , []);

  const handleSelect = (team, player) => {
    setSelected(team, player)
    setIsFormOpen(false);
  }

  const handleFormView = (team, player) => {
    if (!team?._id && !player?._id) setSelected(null);
    setIsFormOpen(prev => !prev);
  }



  const handleAddTeam = async (team) => {
    try {
      const newTeam = await teamService.teamCreate(team);
      setTeams([...teams, newTeam]);
    } catch (err) {
      console.error(err);
    }
  }

  const handleAddPlayer = async (player) => {
    try {
      const newPlayer = await playerService.playerCreate(player);
      setPlayers([...players, newPlayer]);
    } catch (err) {
      console.error(err);
    }
  }



  const handleUpdateTeam = async (team) => {
    try {
      const updatedTeam = await teamService.teamUpdate(team);
      setTeams(teams.map(t => t._id === updatedTeam._id ? updatedTeam : t));
    } catch (err) {
      console.error(err);
    }
  }
  const handleUpdatePlayer = async (player) => {
    try {
      const updatedPlayer = await playerService.playerUpdate(player);
      setPlayers(players.map(p => p._id === updatedPlayer._id ? updatedPlayer : p));
    } catch (err) {
      console.error(err);
    }
  }



  const handleDeleteTeam = async (id) => {
    try {
      await teamService.teamDelete(id);
      setTeams(teams.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  }
  const handleDeletePlayer = async (id) => {
    try {
      await playerService.playerDelete(id);
      setPlayers(players.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Welcome to the Team Management App</h1>} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/team-list" element={
          <TeamList
            teams={teams}
            handleAddTeam={handleAddTeam}
            handleUpdateTeam={handleUpdateTeam}
            handleDeleteTeam={handleDeleteTeam}
            handleSelect={handleSelect}
            handleFormView={handleFormView} />
        } />

        <Route path="/team-detail" element={
          <TeamDetail
            selected={selected}
            handleUpdateTeam={handleUpdateTeam}
            handleDeleteTeam={handleDeleteTeam}
            handleFormView={handleFormView} />
        } />

        <Route path="/team-form" element={
          <TeamForm
            selected={selected}
            handleAddTeam={handleAddTeam}
            handleUpdateTeam={handleUpdateTeam}
            handleFormView={handleFormView}
            isFormOpen={isFormOpen} />
        } />

        <Route path="/player-form" element={
          <PlayerForm
            selected={selected}
            handleAddPlayer={handleAddPlayer}
            handleUpdatePlayer={handleUpdatePlayer}
            handleFormView={handleFormView} />
        } />

        <Route path="/player-list" element={
          <PlayerList
            players={players}
            handleAddPlayer={handleAddPlayer}
            handleUpdatePlayer={handleUpdatePlayer}
            handleSelect={handleSelect}
            handleDeletePlayer={handleDeletePlayer}
            handleFormView={handleFormView} />
        } />

        <Route path="/player-detail" element={
          <PlayerDetail
            selected={selected}
            handleUpdatePlayer={handleUpdatePlayer}
            handleDeletePlayer={handleDeletePlayer}
            handleFormView={handleFormView} />
        } />

      </Routes>
    </>
  )
}


export default App