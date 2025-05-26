const PlayerList = (props) => {

    return (
        <div>
            <h1>Player List</h1>
            <div>
                {props.players.length === 0 ? (
                    <h2>No Players Yet!</h2>
                ) : (
                    <ul>
                        {props.players.map((player) => (
                            <li key={player._id}>
                                <h3>{player.name}</h3>
                                <p>Position: {player.position}</p>
                                <p>Team: {player.team}</p>
                                <p>Number: {player.number}</p>
                                <button onClick={() => props.handleUpdatePlayer(player)}>Edit</button>
                                <button onClick={() => props.handleDeletePlayer(player._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default PlayerList;