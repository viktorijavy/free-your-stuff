import axios from "axios";

const service = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005",
  withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = err => {
  throw err;
};

const getItems = () => {
  return service
    .get("/items")
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  return service
    .post("/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};

const createItem = (newItem) => {
  return service
    .post("/items", newItem)
    .then(res => res.data)
    .catch(errorHandler);
};

const cloudinaryService = {
    service,
    getItems,
    uploadImage,
    createItem
  };
  
export default cloudinaryService;
