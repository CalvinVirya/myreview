import axios from "axios";

const url = "https://myreview-phi.vercel.app/business";

async function fetchBusiness(lat, lon) {
  const response = await axios.get(
    `${url}?userLat=${lat}&userLng=${lon}`
  );
  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  } else {
    console.log("error");
  }
}

async function fetchBookmarkBusiness() {
  const response = await axios.get(
    `${url}/many/bookmark`
  );
  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  } else {
    console.log("error");
  }
}

async function fetchBusinessPrefix(lat, lon, prefix, category) {
  console.log(category);
  const response = await axios.get(
    `${url}/search?category=${category}&prefix=${prefix}&userLat=${lat}&userLng=${lon}`
  );
  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  } else {
    console.log("error");
  }
}

async function fetchBusinessId(id) {
  const response = await axios.get(`${url}/${id}`);
  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  } else {
    console.log("error");
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
  try {
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
    const res = await axios.post(url, postObject);
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
    `${url}/image`,
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
    `${url}/address?lat=${lat}&lon=${lon}`
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
  fetchBusinessPrefix,
  fetchBookmarkBusiness,
};
