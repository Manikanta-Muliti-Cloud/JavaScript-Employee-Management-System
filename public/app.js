const form = document.getElementById("employee-form");
const list = document.getElementById("employee-list");
const message = document.getElementById("message");
const employeeId = document.getElementById("employee-id");

function showMessage(text, isError = true) {
  message.textContent = text;
  message.style.color = isError ? "#b52d36" : "#167344";
}

async function loadEmployees() {
  list.innerHTML = '<tr><td colspan="5">Loading employees...</td></tr>';
  try {
    const response = await fetch("/api/employees");
    if (!response.ok) throw new Error("Could not load employees");
    const employees = await response.json();
    if (!employees.length) {
      list.innerHTML = '<tr><td colspan="5">No employees yet. Add your first employee above.</td></tr>';
      return;
    }
    list.innerHTML = employees.map((employee) => `
      <tr>
        <td>${escapeHtml(employee.name)}</td>
        <td>${escapeHtml(employee.email)}</td>
        <td>${escapeHtml(employee.department)}</td>
        <td>${escapeHtml(employee.role)}</td>
        <td>
          <button type="button" onclick="editEmployee('${employee._id}')">Edit</button>
          <button type="button" class="danger" onclick="deleteEmployee('${employee._id}')">Delete</button>
        </td>
      </tr>`).join("");
  } catch (error) {
    list.innerHTML = '<tr><td colspan="5">Unable to connect to the API. Check the server and database.</td></tr>';
  }
}

// Escape database values before placing them into HTML.
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    department: document.getElementById("department").value.trim(),
    role: document.getElementById("role").value.trim()
  };
  const id = employeeId.value;
  const url = id ? `/api/employees/${id}` : "/api/employees";
  try {
    const response = await fetch(url, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Request failed");
    showMessage(id ? "Employee updated successfully." : "Employee added successfully.", false);
    resetForm();
    loadEmployees();
  } catch (error) {
    showMessage(error.message);
  }
});

async function editEmployee(id) {
  try {
    const response = await fetch(`/api/employees/${id}`);
    const employee = await response.json();
    if (!response.ok) throw new Error(employee.message);
    employeeId.value = employee._id;
    document.getElementById("name").value = employee.name;
    document.getElementById("email").value = employee.email;
    document.getElementById("department").value = employee.department;
    document.getElementById("role").value = employee.role;
    document.getElementById("form-title").textContent = "Edit employee";
    document.getElementById("submit-button").textContent = "Save changes";
    document.getElementById("cancel-button").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    showMessage(error.message);
  }
}

async function deleteEmployee(id) {
  if (!window.confirm("Are you sure you want to delete this employee?")) return;
  try {
    const response = await fetch(`/api/employees/${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    showMessage("Employee deleted successfully.", false);
    loadEmployees();
  } catch (error) {
    showMessage(error.message);
  }
}

function resetForm() {
  form.reset();
  employeeId.value = "";
  document.getElementById("form-title").textContent = "Add an employee";
  document.getElementById("submit-button").textContent = "Add employee";
  document.getElementById("cancel-button").classList.add("hidden");
}

document.getElementById("cancel-button").addEventListener("click", resetForm);
document.getElementById("refresh-button").addEventListener("click", loadEmployees);
loadEmployees();