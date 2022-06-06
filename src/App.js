import React from 'react';
import { useEffect, useState } from 'react';

import members from './apis/members.js';
import searchInUsers from "./utils/searchUtil.js";

import AdminsList from './components/admin/AdminsList.js';
import Modal from './components/modal/Modal.js';
import Pagination from './components/pagination/Pagination.js';
import Search from './components/search/Search.js';

import './assets/css/main.css';

const App = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [adminsPerPage] = useState(10);
    const [actionIndex, setActionIndex] = useState(-1);
    const [searchState, setSearchState] = useState(false);
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const fetchAdmins = async () => {
            setLoading(true);
            const res = await members.get('/members.json');
            setLoading(false);
            setAdmins(res.data);
        }
        fetchAdmins();  
    } ,[]); // [] runs only once

    const lastIndex = currentPage * adminsPerPage;
    const firstIndex = lastIndex - adminsPerPage;
    const currentAdmins = admins.slice(firstIndex, lastIndex);

    const paginate = (pageNumber)=>{
        setCurrentPage(pageNumber);
    }

    const onEditFormSubmit = (data) => {

        let index = admins.findIndex((admin)=>{
            return admin.id === actionIndex;
        }, -1);

        let temp = [...admins]
        
        if(data.name !== ''){
            temp[index].name = data.name;
        }

        if(data.role !== ''){
            temp[index].role = data.role;
        }

        if(data.email !== ''){
            temp[index].email = data.email;
        }

        if(filteredAdmins.length !== 0){
            const filter  = filteredAdmins.map((admin)=>{
                if(admin.id === actionIndex){
                    admin.name = data.name;
                    admin.role = data.role;
                    admin.email = data.email

                    return admin;
                }
                return admin;
            })

            setFilteredAdmins(filter);
        }

        setAdmins(temp);
        
        closeModal();
    }

    const handleSearch = (term) => {
        if(term.length >= 2){
            const res = searchInUsers(term, admins);
            setSearchState(true);
            setFilteredAdmins(res);
        }else{
            setSearchState(false);
            setAdmins(admins);
        }
    }

    /* modal functionality */
    const closeModal = () => {
        let modalEl = document.querySelector('#admin-modal');
        modalEl.style.display = "none";
    }

    const openModal = (id) => {
        let modalEl = document.querySelector('#admin-modal');
        modalEl.style.display = "block";
       
        setActionIndex(id);
    }

    const deleteRow = (id) => {
    
        if(searchState){
            let filter = filteredAdmins.filter((admin) =>  admin.id !== id);
            setFilteredAdmins(filter);
        }

        let temp = admins.filter((admin) =>  admin.id !== id);
        setAdmins(temp);
    }

    const deleteSelect = (e) => {

        let rows = document.getElementsByClassName('row-select');
        let checkedRows = [];

        Array.from(rows).filter((row) => {
            if(row.checked){
                checkedRows.push(row.id);
            }
            return row.checked;
        });

        if(checkedRows.length === 0){
            alert("Please select rows to delete");
            return;
        }

        if(window.confirm("Are you sure you want to delete this?")){
            let temp;
            let result;

            if(searchState){
                temp = [...filteredAdmins];

                result = temp.filter((admin) =>{
                    return checkedRows.indexOf(admin.id) === -1;
                });

                setFilteredAdmins(result);
            }

            temp = [...admins];

            result = temp.filter((admin) =>{
                return checkedRows.indexOf(admin.id) === -1;
            });

            setAdmins(result);
        }
    }

    const ToggleCheckBox = (e) => {
        let checkBoxes = document.querySelectorAll('input[type="checkbox"]');
        let count = 0;
        for (let checkbox of checkBoxes) {
            if(checkbox.checked === true){
                count += 1;
            }
        }

        if(count === checkBoxes.length){
            for (let checkbox of checkBoxes) {
                checkbox.checked = !selectAll;
            }
        }else{
            for (let checkbox of checkBoxes) {
                checkbox.checked = true;
            }
        } 

        setSelectAll(prev => !prev);
    }

    return(
        <div className="container">
            <div className="row d-flex justify-content-center text-center">
                <div className="col-12">
                    <h1 className="text-center mb-4">Admin UI</h1>
                    <div className='d-flex top-section justify-content-between mb-2 flex-wrap'>
                        <Search handleSearch={handleSearch}/>
                        <div className="btn-group btns-right">
                            <button type="button" className="btn btn-light" id="selectAll" onClick={(e) => {ToggleCheckBox(e)}}> Select All </button>
                            <button className='btn btn-danger' onClick={(e) => {deleteSelect(e)}}>DELETE</button>
                        </div>
                    </div>
                    <AdminsList admins={currentAdmins} loading={loading} openModal={openModal} deleteRow={deleteRow} filteredAdmins={filteredAdmins} searchState={searchState} ToggleCheckBox={ToggleCheckBox}/>
                    <Pagination adminsPerPage={adminsPerPage} totalAdmins={admins.length} currentPage={currentPage} paginate={paginate} filteredAdmins={filteredAdmins} searchState={searchState}/>
                    <Modal onEditFormSubmit={onEditFormSubmit} closeModal={closeModal}/>
                </div>
            </div>
        </div>
    )
}

export default App;