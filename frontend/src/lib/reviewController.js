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

async function fetchBusinessReviews(businessId) {
  const response = await axios.get(
    `http://localhost:3000/reviews/${businessId}`
  );
  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  } else {
    console.log("error");
  }
}

async function insertReview(title, description, image, businessId, rating) {
  try {
    let postObject = {
      title: title,
      description: description,
      dateCreated: new Date(),
      businessId: businessId,
      rating: rating,
    };
    if (image) {
      const url = await insertImage(image);
      postObject.imageUrl = url;
    }
    const res = await axios.post("http://localhost:3000/reviews", postObject);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

async function insertImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios.post(
    "http://localhost:3000/reviews/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.url;
}

export { fetchReviews, insertReview, insertImage, fetchBusinessReviews };
