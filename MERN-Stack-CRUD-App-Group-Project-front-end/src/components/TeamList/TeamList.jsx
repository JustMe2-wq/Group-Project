const TeamList = (props) => {

    return (
        <div>
            <h1>Team List</h1>
            <div>
                {props.teams.length === 0 ? (
                    <h2>No Teams Yet!</h2>
                ) : (
                    <ul>
                        {props.teams.map((team) => (
                            <li key={team._id}>
                                <h3>{team.name}</h3>
                                <p>City: {team.city}</p>
                                <p>In Playoff: {team.inPlayoff ? 'Yes' : 'No'}</p>
                                <button onClick={() => props.handleUpdateTeam(team)}>Edit</button>
                                <button onClick={() => props.handleDeleteTeam(team._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default TeamList;