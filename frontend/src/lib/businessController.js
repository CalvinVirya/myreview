import axios from "axios";

async function fetchBusiness(lat, lon) {
  const response = await axios.get(
    `http://localhost:3000/business?userLat=${lat}&userLng=${lon}`
  );
  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  } else {
    console.log("error");
  }
}

async function fetchBusinessId(id) {
  const response = await axios.get(`http://localhost:3000/business/${id}`);
  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  } else {
    console.error();
  }
}

async function insertBusiness(
  title,
  description,
  image,
  category,
  position,
  address,
  openTime,
  closeTime
) {
  let postObject = {
    title: title,
    description: description,
    category: category,
    position: position,
    address: address,
    openTime: openTime,
    closeTime: closeTime,
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

async function reverseGeocoding(lat, lon) {
  const response = await axios.get(
    `http://localhost:3000/business/address?lat=${lat}&lon=${lon}`
  );

  console.log(response.data.display_name);
  return response.data.display_name;
}

export {
  fetchBusiness,
  insertBusiness,
  insertImage,
  reverseGeocoding,
  fetchBusinessId,
};
