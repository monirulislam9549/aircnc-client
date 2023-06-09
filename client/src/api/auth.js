// save a user to Database
export const saveUser = (user) => {
  const currentUser = {
    email: user.email,
    displayName: user.displayName,
    // photoURL: user.photoURL,
  };
  fetch(
    `${import.meta.env.VITE_API_URL}/users/${user?.email}&&${user.displayName}`,
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(currentUser),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

// become a host

export const becomeHost = (email) => {
  const currentUser = {
    role: "host",
  };
  return fetch(`${import.meta.env.VITE_API_URL}/users/${email}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(currentUser),
  }).then((res) => res.json());
};

// get role
export const getRole = async (email) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${email}`);
  const user = await res.json();
  return user?.role;
};
