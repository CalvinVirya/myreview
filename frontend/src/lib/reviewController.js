import axios from "axios";

async function fetchReviews() {
  const response = await axios.get("http://localhost:3000/reviews");
  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  } else {
    console.log("error");
  }
}

async function insertReview(title, description) {
  let postObject = {
    title: title,
    description: description,
    dateCreated: new Date(),
  };
  axios.post("http://localhost:3000/reviews", postObject);
}

export { fetchReviews, insertReview };
