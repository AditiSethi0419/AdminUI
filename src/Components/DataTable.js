import { useState } from "react";
import "./dataTable.css";

const DataTable = ({
  users,
  deleteAllSelected,
  deleteSelected,
  addModaldata,
}) => {
  // array state to store all selected users
  const [selected, setSelected] = useState([]);
  // state to check if select all is selected or not
  const [selectAll, setSelectAll] = useState(false);

  const isCheckboxChecked = (id) => {
    if (selected.includes(id)) {
      return true;
    }
    return false;
  };

  /**
   * Function to check and uncheck all users
   * @returns {null}
   */

  const toggleSelectAll = () => {
    setSelected([]);
    if (!selectAll) {
      let arr = [];
      for (let user of users) {
        if (!selected.includes(user.id)) arr.push(user.id);
      }
      setSelected([...selected, ...arr]);
    }
    setSelectAll(!selectAll);
  };

  /**
   * add or removed user id from the selected array
   * @param {string} id - Id of the user
   * @param {*} dependency  - not used -  for future use
   */

  const toggleSelectionList = (id, dependency = false) => {
    if (selected.includes(id)) {
      let index = selected.indexOf(id);
      selected.splice(index, 1);
      setSelected([...selected]);
    } else {
      setSelected([id, ...selected]);
    }
  };

  const deleteAll = () => {
    deleteAllSelected(selected);
    setSelectAll(false);
    setSelected([]);
  };

  const deleteOne = (id) => {
    deleteSelected(id);
  };

  const openEditModal = (id) => {
    addModaldata(id);
  };

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="table-responsive-sm">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      onChange={toggleSelectAll}
                      className="form-check"
                      checked={selectAll}
                    />
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      onClick={() => toggleSelectionList(user.id, false)}
                      className={`table-row ${
                        selectAll || isCheckboxChecked(user.id)
                          ? "selected"
                          : ""
                      }`}
                    >
                      <td>
                        <input
                          type="checkbox"
                          id={user.id}
                          checked={selectAll || isCheckboxChecked(user.id)}
                          onChange={() => toggleSelectionList(user.id)}
                          className="form-check"
                        />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td className="role">{user.role}</td>
                      <td>
                        <div
                          className="d-flex justify-content-center"
                          id="actions"
                        >
                          <button
                            onClick={() =>
                              openEditModal(
                                user.id,
                                user.name,
                                user.email,
                                user.role
                              )
                            }
                          >
                            <i className="fa-sharp fa-regular fa-pen-to-square"></i>
                          </button>
                          <button onClick={() => deleteOne(user.id)}>
                            <i className="fa-regular fa-trash-can"></i>{" "}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="align-left mt-3">
            <button
              className={`btn ${
                selectAll || selected.length > 0 ? "active" : "disabled"
              }`}
              id="deleteAll"
              onClick={deleteAll}
            >
              <span>Delete Selected</span>

              <span>
                <i className="fa-regular fa-trash-can"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataTable;
