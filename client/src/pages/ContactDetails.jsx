import React, { useEffect, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { BsClipboard2Check, BsPencil, BsTrash3 } from "react-icons/bs";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  copyToClipboard,
  formatNo,
  getInitialLetters,
  getRandomColorCode,
} from "../utils/utils";
import { CONTACTS_API } from "../const/const";

function ContactDetails() {
  const textareaRef = useRef(null);
  const param = useParams();
  const [details, setDetails] = useState([]);
  console.log(
    "🚀 ~ file: ContactDetails.jsx:21 ~ ContactDetails ~ details:",
    details
  );

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

  return (
    <div className="flex justify-center align-middle w-full items-center h-full mt-16">
      <div className=" h-[50%] p-5 m-3 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="dropdown dropdown-bottom w-full flex justify-end">
          <label tabIndex={0} className="text-lg font-bold m-1">
            ...
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a>
                <BsPencil /> Edit
              </a>
            </li>
            <li>
              <a>
                <BsTrash3 /> Delete
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center pb-10">
          {/* <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="image"
          /> */}
          <span
            className={`flex items-center justify-center text-white w-24 h-24 mb-3 rounded-full shadow-lg my-auto text-center text-5xl font-bold border-2 border-gray-800`}
            style={{ backgroundColor: getRandomColorCode() }}>
            {getInitialLetters(
              (details[0]?.firstName + " " + details[0]?.lastName).toString()
            )}
          </span>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {details[0]?.firstName} {details[0]?.lastName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {details[0]?.department[0]?.name}
          </span>

          {details[0]?.contactNos[0] &&
            Object.keys(details[0]?.contactNos[0]).map((item, index) => (
              <div key={index} className="flex flex-col mt-4 md:mt-6">
                <label htmlFor="" className="text-sm">
                  {item}
                </label>
                <div className="flex flex-nowrap items-center">
                  <label
                    className="font-semibold mr-3 text-gray-200"
                    htmlFor="">
                    {formatNo(details[0]?.contactNos[0][item])}
                  </label>
                  <a
                    href={`tel:${details[0]?.contactNos[0][item]}`}
                    className="inline-flex items-center mr-3 p-2 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                    <FiPhoneCall />
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?phone=${details[0]?.contactNos[0][item]}`}
                    className="inline-flex items-center mr-3 p-2 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                    <FaWhatsapp />
                  </a>
                  <p
                    onClick={() =>
                      copyToClipboard(
                        textareaRef,
                        `${formatNo(details[0]?.contactNos[0][item])}`
                      )
                    }
                    className="inline-flex items-center mr-3 p-2 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
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
            <div className="flex flex-col mt-4 justify-start">
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
