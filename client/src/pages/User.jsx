import React from "react";
import Input from "../components/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useInputChange from "../hooks/useInputChange";

function User() {
  return (
    <div className="overflow-x-auto mt-16">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th colSpan={2} className="text-center">Allow Permission</th>
          </tr>
          <tr>
            <th colSpan={2}></th>
            <th>Add Contact</th>
            <th>Add Dept</th>
            <th>Add Desig</th>
            <th>Approve</th>
            <th>Reject</th>

          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td><button className="btn btn-primary btn-outline btn-sm">SAVE</button></td>
            <td><button className="btn btn-secondary btn-outline btn-sm">REJECT</button></td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td><button className="btn btn-primary btn-outline btn-sm">SAVE</button></td>
            <td><button className="btn btn-secondary btn-outline btn-sm">REJECT</button></td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td><input type="checkbox" className="toggle toggle-success" checked /></td>
            <td><button className="btn btn-primary btn-outline btn-sm">SAVE</button></td>
            <td><button className="btn btn-secondary btn-outline btn-sm">REJECT</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default User;
