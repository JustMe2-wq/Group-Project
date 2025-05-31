const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/teams`;


const teamIndex = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

const teamCreate = async (team) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(team),
    });
    const data = await res.json();
    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

const teamShow = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    const data = await res.json();
    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

const teamUpdate = async (team) => {
  try {
    const res = await fetch(`${BASE_URL}/${team._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(team),
    });
    const data = await res.json();
    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

const teamDelete = async (teamId) => {
  try {
    const res = await fetch(`${BASE_URL}/${teamId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export {
  teamIndex,
  teamCreate,
  teamShow,
  teamUpdate,
  teamDelete
}