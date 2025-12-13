import axios from "axios";

const url = "https://myreview-phi.vercel.app/message";

async function insertMessage(message, businessId) {
  let postObject = {
    message: message,
    messageDate: new Date(),
  };
  const response = await axios.post(
    `${url}/${businessId}`,
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
    `${url}/${businessId}`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    console.log("error");
  }
}

export { insertMessage, fetchMessages };
