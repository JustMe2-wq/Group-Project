import { useState } from 'react';

const initialState = {
    name: '',
    city: '',
    inPlayoff: false
};

const TeamForm = (props) => {
    const [formData, setFormData] = useState(
        props.selected ? props.selected : initialState
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.selected) {
            props.handleUpdateTeam(formData, props.selected._id);
        } else {
            props.handleAddTeam(formData);
        }
    }

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
                <label htmlFor="city">City:</label>
                <input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="inPlayoff">In Playoff:</label>
                <input
                    type="checkbox"
                    id="inPlayoff"
                    name="inPlayoff"
                    checked={formData.inPlayoff}
                    onChange={(e) => setFormData({ ...formData, inPlayoff: e.target.checked })}
                />
                <button type="submit">{props.selected ? 'Update Team' : 'Add Team'}</button>
            </form>
        </div>
    );
}

export default TeamForm;