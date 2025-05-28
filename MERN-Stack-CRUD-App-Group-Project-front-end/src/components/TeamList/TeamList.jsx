const TeamList = (props) => {

    return (
        <>
            <h1>Team List</h1>
            <div>
                {props.teams.length === 0 ? (
                    <h2>No Teams Yet!</h2>
                ) : (
                    <ul>
                        {props.teams.map((team) => (
                            <li key={team._id}
                                style={{ cursor: "pointer", color: "white" }}
                                onClick={() => props.handleSelect(team)}
                            >
                                {team.name}
                            </li>
                        ))}
                    </ul>
                )}
                <button onClick={props.handleFormView}>
                    {props.isFormOpen ? "Close Form" : "Add Team"}
                </button>
            </div>
        </>
    );
};

export default TeamList;