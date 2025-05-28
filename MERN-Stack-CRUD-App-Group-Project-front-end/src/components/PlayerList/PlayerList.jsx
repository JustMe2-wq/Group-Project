const PlayerList = (props) => {

    return (
        <>
            <h1>Player List</h1>
            <div>
                {props.players.length === 0 ? (
                    <h2>No Player Yet!</h2>
                ) : (
                    <ul>
                        {props.players.map((player) => (
                            <li key={player._id}
                                style={{ cursor: "pointer", color: "white" }}
                                onClick={() => props.handleSelect(player)}
                            >
                                {player.name}
                            </li>
                        ))}
                    </ul>
                )}
                <button onClick={props.handleFormView}>
                    {props.isFormOpen ? "Close Form" : "Add player"}
                </button>
            </div>
        </>
    );
};

export default PlayerList;