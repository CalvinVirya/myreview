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

async function insertUsers(name, email, password, userImage) {
  let postObject = {
    name: name,
    email: email,
    password: password,
    joinDate: new Date(),
  };
  if (userImage) {
    const url = await insertImage(userImage);
    postObject.userImage = url;
  }
  await axios.post("http://localhost:3000/users", postObject);
}

async function insertImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios.post(
    "http://localhost:3000/users/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.url;
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
    throw new Error(response.data.message);
  }
}

async function insertBookmark(businessId) {
  let postObject = {
    businessId: businessId,
  };
  const response = await axios.put(
    "http://localhost:3000/users/bookmark",
    postObject
  );
}

export { fetchUsers, insertUsers, insertImage, verifyUser, insertBookmark };
