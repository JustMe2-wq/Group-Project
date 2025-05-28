const PlayerDetail = (props) => {

    if (!props.selected) {
        return (
            <div>
                <h2>Select a Player</h2>
            </div>
        );
    }
    return (
        <>
            <h2>Player Details</h2>
            <ul>
                <li><strong>Name:</strong> {props.selected.name}</li>
                <li><strong>Position:</strong> {props.selected.position}</li>
                <li><strong>Team:</strong> {props.selected.team ? props.selected.team.name : 'No Team'}</li>
            </ul>
            <button onClick={() => props.handleFormView(props.selected)}>update</button>
            <button onClick={() => props.handleDeletePlayer(props.selected._id)}>Delete</button>
        </>
    );
}

export default PlayerDetail;