import {create} from "zustand";

const useEmployeesStore = create((set) => ({
    employees: [],
}));

export default useEmployeesStore;
