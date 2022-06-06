import React from 'react'
import Admin from './Admin';

const AdminsList = ({admins, loading, openModal, deleteRow, filteredAdmins, searchState}) => {

    if(loading){
        return(
            <div className="text-center p-4">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    let renderedList;

    if(searchState === false){
        renderedList = admins.map(admin => {
            return (
                <Admin key={admin.id} admin={admin} openModal={openModal} deleteRow={deleteRow}/>
            )
        });
    }else{
        renderedList = filteredAdmins.map(admin => {
            return (
                <Admin key={admin.id} admin={admin} openModal={openModal} deleteRow={deleteRow}/>
            )
        });
    }

    if(loading === false && renderedList.length === 0){
        return <div>
            <h4 className='mt-4'> No Admins Found</h4>
        </div>
    }

    return (
        <table className="table table-borderless table-hover table-md custom-table mt-4 table-responsive">
            <thead>
                <tr>
                    <th>
                        <div></div>
                    </th>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {renderedList}
            </tbody>
        </table>
    )
}

export default AdminsList;
