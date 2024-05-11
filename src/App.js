import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [showList, setShowList] = useState(false);
  const [data, setData] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const [empExperience, setEmpExperience] = useState(null);
  const [empEmail, setEmpEmail] = useState("");
  const [newRow, setNewRow] = useState(false);
  const [edit, setEdit] = useState(null);

  // useEffect(() => {
  //   fetchEmployeeData();
  // }, []);
  const handleShowList = () => {
    setShowList(true);
    fetchEmployeeData();
  };

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch(
        "https://crudcrud.com/api/2a6aadb744b5420599d1b4fa7b2c2c4d/sciflareemployees"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  async function postData() {
    const url =
      "https://crudcrud.com/api/2a6aadb744b5420599d1b4fa7b2c2c4d/sciflareemployees";
    const empData = {
      empId: employeeId,
      empName: employeeName,
      experience: empExperience,
      email: empEmail,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);
      fetchEmployeeData();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  const handleSaveInput = () => {
    if (
      empEmail != "" &&
      empExperience != null &&
      employeeId != null &&
      employeeName != ""
    ) {
      postData();
      setNewRow(false);
      setEmpEmail("");
      setEmpExperience(null);
      setEmployeeId(null);
      setEmployeeName("");
    } else {
      alert("Please fill all the input fields");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://crudcrud.com/api/2a6aadb744b5420599d1b4fa7b2c2c4d/sciflareemployees/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchEmployeeData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const updateData = async (id, newData) => {
    console.log(newData);
    try {
      const response = await fetch(
        `https://crudcrud.com/api/2a6aadb744b5420599d1b4fa7b2c2c4d/sciflareemployees/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers if required
          },
          body: JSON.stringify(newData), // Convert the data to JSON string
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      fetchEmployeeData();
      // const updatedData = await response.json();
      // return updatedData;
    } catch (error) {
      console.error("Error updating data:", error.message);
      // You can handle the error here, e.g., show a message to the user
      throw error; // Rethrow the error if needed
    }
  };

  const handleEdit = (id) => {
    setEdit(id);
    const newData = data.filter((arr) => arr._id === id);
    console.log(newData[0].empName);
    setEmpEmail(newData[0].email);
    setEmpExperience(newData[0].experience);
    setEmployeeId(newData[0].empId);
    setEmployeeName(newData[0].empName);
  };

  const handleUpdateInput = () => {
    const empData = {
      empId: employeeId,
      empName: employeeName,
      experience: empExperience,
      email: empEmail,
    };
    if (
      empEmail != "" &&
      empExperience != null &&
      employeeId != null &&
      employeeName != ""
    ) {
      updateData(edit, empData);
      setEmpEmail("");
      setEmpExperience(null);
      setEmployeeId(null);
      setEmployeeName("");
      setEdit(null);
    } else {
      setEdit(null);
    }
  };

  return (
    <div className="App container mt-3">
      {!showList && (
        <div className="text-center p-2">
          <h1 className="text-info">Sciflare</h1>
          <button
            type="button"
            className="btn btn-info btn-lg mx-1"
            onClick={handleShowList}
          >
            Show Employees List
          </button>
        </div>
      )}
      {showList && (
        <>
          <h1 className="text-center p-2 text-info">Sciflare Employees</h1>
          <table className="table table-striped table-bordered table-hover table-sm text-center">
            <thead>
              <tr>
                <th>Employee No</th>
                <th>Employee Name</th>
                <th>Experience</th>
                <th>Email</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Raj</td>
                <td>3</td>
                <td>raj@gmail.com</td>
                <td>
                  <button type="button" className="btn btn-secondary">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger mx-1">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Preethi</td>
                <td>2</td>
                <td>preethi@gmail.com</td>
                <td>
                  <button type="button" className="btn btn-secondary">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger mx-1">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Palani</td>
                <td>6</td>
                <td>palani@gmail.com</td>
                <td>
                  <button type="button" className="btn btn-secondary">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger mx-1">
                    Delete
                  </button>
                </td>
              </tr>
              {data.map((empData) => (
                <tr key={empData._id}>
                  {(edit == null || edit != empData._id) && (
                    <>
                      <td>{empData.empId}</td>
                      <td>{empData.empName}</td>
                      <td>{empData.experience}</td>
                      <td>{empData.email}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => handleEdit(empData._id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger mx-1"
                          onClick={() => handleDelete(empData._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                  {edit == empData._id && (
                    <>
                      <td>
                        <input
                          value={employeeId}
                          type="number"
                          placeholder="Enter employee Id/No."
                          className="form-control"
                          onChange={(e) => setEmployeeId(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          value={employeeName}
                          onChange={(e) => setEmployeeName(e.target.value)}
                          type="text"
                          placeholder="Enter employee name"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          value={empExperience}
                          onChange={(e) => setEmpExperience(e.target.value)}
                          type="number"
                          placeholder="Enter experience"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          value={empEmail}
                          onChange={(e) => setEmpEmail(e.target.value)}
                          type="email"
                          placeholder="Enter email"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleUpdateInput}
                        >
                          Save
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {newRow && (
                <tr>
                  <td>
                    <input
                      value={employeeId}
                      type="number"
                      placeholder="Enter employee Id/No."
                      className="form-control"
                      onChange={(e) => setEmployeeId(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                      type="text"
                      placeholder="Enter employee name"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      value={empExperience}
                      onChange={(e) => setEmpExperience(e.target.value)}
                      type="number"
                      placeholder="Enter experience"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      value={empEmail}
                      onChange={(e) => setEmpEmail(e.target.value)}
                      type="email"
                      placeholder="Enter email"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSaveInput}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="button float-end p-3">
            <button
              type="button"
              className="btn btn-success btn-lg"
              onClick={(e) => setNewRow(true)}
            >
              Add
            </button>
          </div>
          <div className="bg-warning row p-3 mt-5">
            Note: First three data are default it can't be deletable after third
            row only fetched from api
          </div>
        </>
      )}
    </div>
  );
}

export default App;
