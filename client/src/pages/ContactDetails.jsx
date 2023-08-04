import React, { useEffect, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { GiRotaryPhone } from "react-icons/gi";
import { MdOutlinePhonelinkRing } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { BsClipboard2Check, BsPencil, BsTrash3 } from "react-icons/bs";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  convertFirstLetterToCapital,
  copyToClipboard,
  formatNo,
  getInitialLetters,
  getRandomColorCode,
} from "../utils/utils";
import { CONTACTS_API } from "../const/const";
import { useSelector } from "react-redux";
import ShimmerContactDetails from "../components/shimmerUI/ShimmerContactDetails";
import { genricError } from "../utils/genricError";

function ContactDetails() {
  const textareaRef = useRef(null);
  const param = useParams();
  const [details, setDetails] = useState([]);
  const { permissionList } = useSelector((store) => store.permission);
  const navigate = useNavigate();

  useEffect(() => {
    if (param.id) {
      getContactDetails();
    }
  }, []);

  const getContactDetails = async () => {
    const response = await axios(`${CONTACTS_API}/id`, {
      method: "POST",
      data: { id: param.id },
    });

    setDetails(response?.data);
  };

  const showConfirmation = () => {
    const confirmationToast = toast.custom(
      (t) => (
        <div className="bg-white p-3 rounded-md text-black font-semibold shadow-md">
          Do you want to delete this contact? 🤨
          <div className="flex justify-end space-x-3">
            <button
              className="btn btn-outline m-2"
              onClick={() => toast.dismiss(t.id)}>
              No
            </button>
            <button
              className="btn btn-error m-2"
              onClick={() => handleYes(t.id)}>
              Yes
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
      }
    );
  };

  const handleYes = async (toastId) => {
    try {
      toast.dismiss(toastId, true);
      const response = await axios.delete(`${CONTACTS_API}/${param.id}`);
      if (response.status == 200) {
        toast.success("Contact deleted successfully👍🏻");
        navigate("/");
      }
    } catch (error) {
      genricError(error);
    }
  };

  if (details.length == 0) {
    return <ShimmerContactDetails />;
  }
  return (
    <div className="flex justify-center align-middle w-full items-center h-full mt-16">
      <div className=" p-5 m-3 w-full max-w-sm rounded-lg bg-red-500 dark:bg-base-100 shadow-2xl">
        {permissionList.includes("AC") && (
          <div className="dropdown dropdown-bottom w-full flex justify-end">
            <label tabIndex={0} className="text-lg font-bold m-1">
              ...
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
              <li>
                <Link to={"/updateContact/" + param.id}>
                  <a className="flex gap-2">
                    <BsPencil /> Edit
                  </a>
                </Link>
              </li>
              <li onClick={showConfirmation}>
                <a>
                  <BsTrash3 /> Delete
                </a>
              </li>
            </ul>
          </div>
        )}
        <div className="flex flex-col items-center pb-10">
          {/* <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="image"
          /> */}
          <span
            className={`flex items-center justify-center text-white w-24 h-24 mb-3 rounded-full shadow-lg my-auto text-center text-5xl font-bold`}
            style={{ backgroundColor: getRandomColorCode() }}>
            {getInitialLetters(
              (
                details[0]?.firstName?.split(" ") +
                " " +
                details[0]?.lastName?.split(" ")
              ).toString()
            )}
          </span>
          <h5 className="mb-1 text-xl font-medium">
            {details[0]?.firstName} {details[0]?.lastName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {details[0]?.designation[0]?.name}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {details[0]?.department[0]?.name}
          </span>

          {details[0]?.contactNos[0] &&
            Object.keys(details[0]?.contactNos[0]).map((item, index) => (
              <div key={index} className="flex flex-col mt-4 md:mt-6">
                <label htmlFor="" className="text-sm">
                  {convertFirstLetterToCapital(item)}
                </label>
                <div className="flex flex-nowrap items-center">
                  <label className="font-semibold mr-3" htmlFor="">
                    {formatNo(details[0]?.contactNos[0][item])}
                  </label>
                  <a
                    href={`tel:${details[0]?.contactNos[0][item]}`}
                    className="inline-flex items-center mr-3 p-2 py-2 text-sm font-medium text-center text-gray-900 bg-white border rounded-md">
                    {item == "office" ? (
                      <FiPhoneCall className="" />
                    ) : (
                      <MdOutlinePhonelinkRing />
                    )}
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?phone=${details[0]?.contactNos[0][item]}`}
                    className="inline-flex items-center mr-3 p-2 py-2 text-sm font-medium text-center text-gray-900 bg-white border rounded-md">
                    <FaWhatsapp />
                  </a>
                  <p
                    onClick={() =>
                      copyToClipboard(
                        textareaRef,
                        `${formatNo(details[0]?.contactNos[0][item])}`
                      )
                    }
                    className="inline-flex items-center mr-3 p-2 py-2 text-sm font-medium text-center text-gray-900 bg-white border rounded-md">
                    <BsClipboard2Check />
                  </p>
                </div>

                <div>
                  <textarea
                    ref={textareaRef}
                    style={{ position: "absolute", left: "-9999px" }}
                    readOnly
                  />
                </div>
              </div>
            ))}
          {details[0]?.notes && (
            <div className="flex flex-col mt-4">
              <label htmlFor="">Notes:</label>
              <textarea
                name="notes"
                id=""
                cols="30"
                rows="3"
                value={details[0]?.notes}
                disabled></textarea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
