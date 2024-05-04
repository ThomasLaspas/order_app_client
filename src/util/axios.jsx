import axios from "axios";

const cloudinary = process.env.REACT_APP_CLOUDINARY_ID;
const url = process.env.AXIOS_URL;
const tok = process.env.REACT_STRIPE_SECRET_KEY;
export const server = axios.create({
  baseURL: `https://order-app-server.onrender.com`,
  responseType: "json",
});

export const createCheckoutSession = async (lineItems) => {
  try {
    const formData = new URLSearchParams();
    formData.append("payment_method_types[]", "card");
    lineItems.forEach((item, index) => {
      formData.append(`line_items[${index}][price_data][currency]`, "eur");
      formData.append(
        `line_items[${index}][price_data][product_data][name]`,
        item.name
      );
      formData.append(
        `line_items[${index}][price_data][unit_amount]`,
        Math.round(item.price * 100).toString()
      );
      formData.append(
        `line_items[${index}][quantity]`,
        item.quantity.toString()
      );
    });
    formData.append("mode", "payment");
    formData.append("success_url", "http://localhost:5173/success");
    formData.append("cancel_url", "http://localhost:5173/failed");
    const response = await axios.post(
      "https://api.stripe.com/v1/checkout/sessions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${tok}`,
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.error(
      "Error creating checkout session:",
      error.response.data.error
    );
    throw error;
  }
};

export const paycheck = async (data, tok) => {
  try {
    const check = await server.post(
      "api/order/checkout/create-checkout-session",
      data,
      {
        headers: {
          Authorization: `Bearer ${tok}`,
        },
      }
    );

    return check.data;
  } catch (err) {
    console.log(err);
    alert("SOMETHING WRONG HAPPEND TRY AGAIN");
  }
};

export const handleFileUpload = async (uploadfile) => {
  const allowedExtensions = ["png", "jpeg", "jpg"];

  // Check if the file type is acceptable
  const fileExtension = uploadfile.name.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    alert("File type not allowed. Please upload a PNG, JPEG, or JPG file.");
    return;
  }
  //
  const formData = new FormData();
  formData.append("file", uploadfile);
  formData.append("upload_preset", "socialmedia");
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinary}/image/upload/`,
      formData
    );
    return response.data.secure_url;
  } catch (err) {
    throw new Error("An error occurred while uploading the image.");
  }
};
