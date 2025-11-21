import axios from "axios";

async function fetchBusiness() {
  const response = await axios.get("http://localhost:3000/business");
  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  } else {
    console.log("error");
  }
}

async function insertBusiness(title, description, image, category, position, openTime, closeTime) {
  let postObject = {
    title: title,
    description: description,
    category: category,
    position: position,
    openTime: openTime,
    closeTime: closeTime
  };
  if (image) {
    const url = await insertImage(image);
    postObject.imageUrl = url;
  }
  axios.post("http://localhost:3000/business", postObject);
}

async function insertImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios.post(
    "http://localhost:3000/business/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.url;
}

export { fetchBusiness, insertBusiness, insertImage };
