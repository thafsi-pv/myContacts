import { toast } from "react-hot-toast";

export const genricError = (error) => {
  if (error.response.status == 401) {
  } else if (error.response.status == 409) {
    console.log("🚀 ~ file: genricError.js:6 ~ genricError ~ error:", error)
    toast.error(error.response.data.message);
  } else {
    toast.error(error.response.data.message);
  }
};
