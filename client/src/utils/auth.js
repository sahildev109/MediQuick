

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export const logout = () => {
   
    localStorage.removeItem("user");


};
export const logoutAdmin = () => {
   
    localStorage.removeItem("user");
    localStorage.removeItem("medicinesNO");
    localStorage.clear()


};
