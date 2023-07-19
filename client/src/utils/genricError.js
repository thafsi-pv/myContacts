import { toast } from "react-hot-toast";

export const genricError = (error) => {
  if (error.response.status == 401) {
  } else {
    toast.error(error.response.data.message);
  }
};
