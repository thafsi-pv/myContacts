import React from "react";
import {
  formatNo,
  getInitialLetters,
  getRandomColorCode,
} from "../utils/utils";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function ContactListItem({ item }) {
  const navigate = useNavigate();

  const handleContact = (id) => {
    navigate("/contactDetails/" + id);
  };
  return (
    <React.Fragment>
      <thead>
        <tr>
          <th className="font-bold uppercase">{item._id}</th>
        </tr>
      </thead>
      <tbody>
        {item.contacts.map((contact, index) => (
          <tr
            key={contact._id}
            className="h-10 border-1 border-base-200 hover:bg-base-200 mb-4 cursor-pointer"
            onClick={() => handleContact(contact._id)}>
            {/* <td className="p-2">{index + 1}</td> */}
            <td className="p-1">
              <span
                className={`flex items-center justify-center text-white w-10 lg:w-14 h-10 lg:h-14 rounded-full shadow-lg my-auto text-center text-xl font-bold`}
                style={{ backgroundColor: getRandomColorCode() }}>
                {getInitialLetters(
                  (contact.firstName + " " + contact.lastName).toString()
                )}
              </span>
            </td>
            <td className="w-[80%]">
              <div className="flex flex-col justify-start">
                <span className="text-lg font-medium">
                  {contact.firstName} {contact.lastName}
                </span>
                <div>
                  <span className="">{contact?.designation[0]?.name}</span>
                  {contact?.designation[0]?.name && contact?.department[0]?.name
                    ? ` | `
                    : ""}
                  <span>{contact?.department[0]?.name}</span>
                </div>
                <div>
                  <span>
                    {formatNo(Object.values(contact.contactNos[0])[1])}
                  </span>
                </div>
              </div>
            </td>
            <td className="pl-0 ">
              <BsArrowRight className="h-6 w-6 text-gray-400" />
            </td>
          </tr>
        ))}
      </tbody>
    </React.Fragment>
  );
}

export default React.memo(ContactListItem);
