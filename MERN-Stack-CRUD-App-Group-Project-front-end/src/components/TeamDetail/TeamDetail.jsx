const TeamDetail = (props) => {
    if (!props.selected) {
        return (
            <div>
                <h2>Select a Team</h2>
            </div>
        );
    }
     const teamPlayers = props.players
        ? props.players.filter(player => player.team && player.team._id === props.selected._id)
        : [];
        
    return (
        <>
            <h2>Team Details</h2>
            <ul>
                <li><strong>Name:</strong> {props.selected.name}</li>
                <li><strong>City:</strong> {props.selected.city}</li>
                <li><strong>In Playoff:</strong> {props.selected.inPlayoff ? 'Yes' : 'No'}</li>
                 <li>
                    <strong>Players:</strong>
                    <ul>
                        {teamPlayers.length > 0 ? (
                            teamPlayers.map(player => (
                                <li key={player._id}>
                                    {player.name} ({player.position})
                                </li>
                            ))
                        ) : (
                            <li>No Players in this Team</li>
                        )}
                    </ul>
                </li>
            </ul>
            <button onClick={() => props.handleFormView(props.selected)}>Update</button>
            <button onClick={() => props.handleDeleteTeam(props.selected._id)}>Delete</button>
        </>
    );
}

export default TeamDetail;