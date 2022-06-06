import React from 'react'

const Admin = ({admin, openModal, deleteRow}) => {

  return (
    <tr>
        <td>
            <div className="custom-control">
                <input type="checkbox" className="custom-control-input row-select" id={admin.id}/>
            </div>
        </td>
        <th scope="row">{admin.id}</th>
        <td>{admin.name}</td>
        <td>{admin.role}</td>
        <td>{admin.email}</td>
        <td>
          <button className="btn m-2 action-icon" onClick={(e) => openModal(admin.id)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="btn m-2 action-icon" onClick={(e) => deleteRow(admin.id)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
    </tr>
  )
}

export default Admin;