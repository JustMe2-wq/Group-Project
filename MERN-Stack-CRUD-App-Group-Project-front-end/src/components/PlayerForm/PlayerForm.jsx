import { useState } from "react";

const initialState = {
  name: "",
  position: "",
  team: "",
};

const PlayerForm = (props) => {
    const [formData, setFormData] = useState(
        props.selected ? props.selected : initialState
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.selected) {
            props.handleUpdatePlayer(formData, props.selected._id);
        } else {
            props.handleAddPlayer(formData);
        }
        setFormData(initialState);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
                <label htmlFor="position">Position:</label>
                <input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                />
                <label htmlFor="team">Team:</label>
                <input
                id="team"
                name="team"
                value={formData.team}
                onChange={handleChange}
                required
                />
                <button type="submit">
                    {props.selected ? "Update Player" : "Add Player"}
                </button>
            </form>
        </div>
    )

}

export default PlayerForm;