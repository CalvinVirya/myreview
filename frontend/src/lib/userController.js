import axios from "axios";

async function fetchUsers() {
  const response = await axios.get("http://localhost:3000/users");
  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  } else {
    console.log("error");
  }
}

async function insertUsers(name, email, password) {
  let postObject = {
    name: name,
    email: email,
    password: password,
    joinDate: new Date(),
  };
  axios.post("http://localhost:3000/users", postObject);
}

async function verifyUser(email, password) {
  let postObject = {
    email: email,
    password: password,
  };
  const response = await axios.post(
    "http://localhost:3000/users/login",
    postObject
  );
//   console.log(response.data.user);
  if (response.data.success) {
    return response.data.token;
  } else {
    throw new Error(response.statusText);
  }
}

export { fetchUsers, insertUsers, verifyUser };
