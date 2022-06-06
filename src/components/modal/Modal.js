import React from 'react';

import { validateEmail, validateText, ValidateRole } from '../../utils/adminsUtil';

const Modal = ({onEditFormSubmit, closeModal}) => {

    const onFormSubmit = (e) => {
        e.preventDefault();

        const form = document.getElementById('edit-admin');
        let name = form.elements['name'].value;
        let role = form.elements['role'].value;
        let email = form.elements['email'].value;

        if(email !== ''){
            if(validateEmail(email)===false){
                alert("Please enter a valid email address");
                return;
            }
        }

        if(name !== ''){
            if(validateText(name) === false){
                alert("Name length should be more than 2 letters");
                return;
            }
        }

        if(role !== ''){
            if(ValidateRole(role) === false){
                alert("Role can only be either Admin or Member");
                return;
            }
        }
        
        const data = {
            name,
            role,
            email
        }
        onEditFormSubmit(data);
    }

    return (
        <div className="modal" id="admin-modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Admin</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={onFormSubmit} id="edit-admin" className='form-control'>
                            <label className="control-label">Name</label>
                            <div>
                                <input className="form-control input-md" type="text" id="name" name="name" placeholder='Name...'/>
                            </div>
                            <label className="control-label">Role</label>
                            <div>
                                <input className="form-control input-md" type="text" id="role" name="role" placeholder='Role...'/>
                            </div>
                            <label className="control-label">Email</label>
                            <div>
                                <input className="form-control input-md" type="email" id="email" name="email" placeholder='Admin...' formNoValidate/>
                            </div>
                            <button type="submit" className="btn btn-dark mt-2">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;