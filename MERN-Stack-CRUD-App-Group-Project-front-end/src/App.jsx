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
        const fetchedTeams = await teamService.teamIndex();
        if (fetchedTeams.err) {
          throw new Error(fetchedTeams.err);
        }
        setTeams(fetchedTeams);
      }
      catch (err) {
        console.error(err);
      }
    }
    fetchTeams();

    const fetchPlayers = async () => {
      try {
        const fetchedPlayers = await playerService.playerIndex();
        if (fetchedPlayers.err) {
          throw new Error(fetchedPlayers.err);
        }
        setPlayers(fetchedPlayers);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPlayers();
  }, []);

  const handleSelect = (team, player) => {
    setSelected(team, player)
    setIsFormOpen(false);
  }

  const handleFormView = (team, player) => {
    console.log('this is handle form view')
    if (!team?._id && !player?._id)
      setSelected(null);
    setIsFormOpen(!isFormOpen);
  }



  const handleAddTeam = async (team) => {
    try {
      const newTeam = await teamService.teamCreate(team);
      if (newTeam.err) {
        throw new Error(newTeam.err);
      }
      setTeams([newTeam, ...teams]);
    } catch (err) {
      console.error(err);
    }
  }
  const handleAddPlayer = async (player) => {
    try {
      const playerData = { ...player, team: player.team === '' ? null : player.team };
      const newPlayer = await playerService.playerCreate(playerData);
      if (newPlayer.err) {
        throw new Error(newPlayer.err);
      }
      setPlayers([newPlayer, ...players]);
    } catch (err) {
      console.error(err);
    }
  }



  const handleUpdateTeam = async (formData, teamId) => {
    try {
      const updatedTeam = await teamService.teamUpdate(formData, teamId);
      if (updatedTeam.err) {
        throw new Error(updatedTeam.err);
      }
      const updatedTeamList = teams.map((team) => (
        team._id !== updatedTeam._id ? team : updatedTeam
      ));
      setTeams(updatedTeamList);
      setSelected(updatedTeam);
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  }


  const handleUpdatePlayer = async (formData, playerId) => {
    try {
      const updatedPlayer = await playerService.playerUpdate(formData, playerId);
      if (updatedPlayer.err) {
        throw new Error(updatedPlayer.err);
      }
      const updatedPlayerList = players.map((player) => (
        player._id !== updatedPlayer._id ? player : updatedPlayer
      ));
      setPlayers(updatedPlayerList);
      setSelected(updatedPlayer);
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  }



  const handleDeleteTeam = async (teamId) => {
    try {
      await teamService.teamDelete(teamId);
      setTeams(teams.filter(team => team._id !== teamId));
      if (selected && selected._id === teamId) {
        setSelected(null);
      }
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  }
  const handleDeletePlayer = async (playerId) => {
    try {
      await playerService.playerDelete(playerId);
      setPlayers(players.filter(player => player._id !== playerId));
      if (selected && selected._id === playerId) {
        setSelected(null);
      }
      setSelected(null);
      setIsFormOpen(false);
    }
    catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/" element={
          <div className="home">
            <h1>Welcome to the Goy's Team Management Playoff App</h1>
            <p>Manage your teams and players for the upcoming Playoffs</p>
          </div>
        } />
        <Route
          path="/teams"
          element={
            <>
              <TeamList
                teams={teams}
                handleSelect={handleSelect}
                handleFormView={handleFormView}
                isFormOpen={isFormOpen}
              />
              {isFormOpen ? (
                <TeamForm
                  selected={selected}
                  handleAddTeam={handleAddTeam}
                  handleUpdateTeam={handleUpdateTeam}
                />
              ) : (
                <TeamDetail
                  players={players}
                  selected={selected}
                  handleSelect={handleSelect}
                  handleDeleteTeam={handleDeleteTeam}
                  handleFormView={handleFormView}
                />
              )}
            </>
          }
        />
        <Route
          path="/players"
          element={
            <>
              <PlayerList
                players={players}
                handleSelect={handleSelect}
                handleFormView={handleFormView}
                isFormOpen={isFormOpen}
              />
              {isFormOpen ? (
                <PlayerForm
                  teams={teams}
                  selected={selected}
                  handleAddPlayer={handleAddPlayer}
                  handleUpdatePlayer={handleUpdatePlayer}
                />
              ) : (
                <PlayerDetail
                  teams={teams}
                  selected={selected}
                  handleSelect={handleSelect}
                  handleDeletePlayer={handleDeletePlayer}
                  handleFormView={handleFormView}
                />
              )}
            </>
          }
        />
      </Routes>
    </>
  )
}


export default App