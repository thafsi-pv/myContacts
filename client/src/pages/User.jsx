import React from "react";
import Input from "../components/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useInputChange from "../hooks/useInputChange";

function User() {
  return (
    <div className="overflow-x-auto mt-16">
      <table className="table table-sm border !border-gray-300 m-3 ">
        {/* head */}
        <thead>
          <tr className="border !border-gray-300">
            <th colSpan={5} className="text-center border !border-gray-300">Allow Permission</th>
            <th colSpan={2} className="text-center border !border-gray-300">Action</th>
          </tr>
          <tr>
            <th className="text-center border !border-gray-300" colSpan={2}>Name</th>
            <th className="text-center border !border-gray-300">Add Contacts</th>
            <th className="text-center border !border-gray-300">Department</th>
            <th className="text-center border !border-gray-300">Designation</th>
            <th className="text-center border !border-gray-300">Approve</th>
            <th className="text-center border !border-gray-300">Reject</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th className="text-center border !border-gray-300">1</th>
            <td className="text-center border !border-gray-300">Cy Ganderton</td>
            <td className="text-center border !border-gray-300"><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td className="text-center border !border-gray-300"><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td className="text-center border !border-gray-300"><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td className="text-center border !border-gray-300"><button className="btn btn-primary btn-outline btn-xs">APPROVE</button></td>
            <td className="text-center border !border-gray-300"><button className="btn btn-secondary btn-outline btn-xs">REJECT</button></td>
          </tr>
          {/* row 2 */}
          <tr>
            <th className="text-center border !border-gray-300">2</th>
            <td className="text-center border !border-gray-300">Hart Hagerty</td>
            <td className="text-center border !border-gray-300"><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td className="text-center border !border-gray-300"><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td className="text-center border !border-gray-300"><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td className="text-center border !border-gray-300"><button className="btn btn-primary btn-outline btn-sm">SAVE</button></td>
            <td className="text-center border !border-gray-300"><button className="btn btn-secondary btn-outline btn-sm">REJECT</button></td>
          </tr>
          {/* row 3 */}
          <tr>
            <th className="text-center border !border-gray-300">3</th>
            <td className="text-center border !border-gray-300">Brice Swyre</td>
            <td className="text-center border !border-gray-300"><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td className="text-center border !border-gray-300"><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td className="text-center border !border-gray-300"><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td className="text-center border !border-gray-300"><button className="btn btn-primary btn-outline btn-sm">SAVE</button></td>
            <td className="text-center border !border-gray-300"><button className="btn btn-secondary btn-outline btn-sm">REJECT</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default User;
