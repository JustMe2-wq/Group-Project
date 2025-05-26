const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/players`;

const playerIndex = async () => {
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

const playerCreate = async (player) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
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

const playerShow = async (id) => {
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

const playerDelete = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
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

const playerUpdate = async (player) => {
  try {
    const res = await fetch(`${BASE_URL}/${player._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
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
  playerIndex,
  playerCreate,
  playerShow,
  playerDelete,
  playerUpdate
};