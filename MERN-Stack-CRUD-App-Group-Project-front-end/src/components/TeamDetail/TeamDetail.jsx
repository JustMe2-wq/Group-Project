const TeamDetail = (props) => {
    if (!props.selected) {
        return (
            <div>
                <h2>Select a Team</h2>
            </div>
        );
    }
    return (
        <>
            <h2>Team Details</h2>
            <ul>
                <li><strong>Name:</strong> {props.selected.name}</li>
                <li><strong>City:</strong> {props.selected.city}</li>
                <li><strong>In Playoff:</strong> {props.selected.inPlayoff ? 'Yes' : 'No'}</li>
            </ul>
        </>
    );
}

export default TeamDetail;