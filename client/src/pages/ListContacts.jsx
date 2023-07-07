import React from "react";
import Input from "../components/Input";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import PDFFile from '../components/PDFFile';
import { PDFDownloadLink } from "@react-pdf/renderer";

function ListContacts() {
  const navigate = useNavigate();

  const handleContact = () => {
    navigate("/contactDetails");
  };



  return (
    <div className="flex flex-col justify-center mt-16">
      <div>
      <PDFDownloadLink document={<PDFFile />} filename="FORM">
      {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
      </PDFDownloadLink>
      </div>
      <div className=" top-0 w-[100%]">
        <Input />
      </div>
      <div className="overflow-x-auto h-[800px] w-screen mt-20 p-3">
        <table className="table table-xs lg:table-lg table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <td>Name</td>
              <td>View</td>
            </tr>
          </thead>
          <tbody>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]" onClick={handleContact}>
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
            <tr className="h-10">
              <th>1</th>
              <td className="w-[80%]">
                <div className="flex flex-col justify-start">
                  <span className="text-lg">Cy Ganderton</span>
                  <span>Dept Name</span>
                </div>
              </td>
              <td>
                <BsArrowRight className="h-6 w-6" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default ListContacts;
