
const searchInAdmins = (search, admins) => {

    let term = search.toLowerCase();

    const temp = admins.filter((admin) => {
        if(admin.name.toLowerCase().includes(term) ||
            admin.role.toLowerCase().includes(term) ||
            admin.email.toLowerCase().includes(term))
        {
            return true;
        }
        return false;
    });

    return temp;
};

export default searchInAdmins;
  