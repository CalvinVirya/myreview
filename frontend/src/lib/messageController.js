import axios from "axios";

async function insertMessage(message, businessId) {
  let postObject = {
    message: message,
  };
  const response = await axios.post(
    `http://localhost:3000/message/${businessId}`,
    postObject
  );
  if (response.status === 200) {
    return response.data;
  } else {
    console.log("error");
  }
}

async function fetchMessages(businessId) {
  const response = await axios.get(
    `http://localhost:3000/message/${businessId}`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    console.log("error");
  }
}

export { insertMessage, fetchMessages };
