const initialState = {
    mangSinhVien: [],
    sinhVienChiTiet: {
        maSV: "",
        hoTen: "",
        sdt: "",
        email: ""
    }
}

export const QLSVReducer = (state = initialState, action) => {
    switch (action.type) {
        case "THEM_SV":
            state.mangSinhVien = [...state.mangSinhVien, action.sv]
            return { ...state };

        case "XOA_SV":
            state.mangSinhVien = state.mangSinhVien.filter(sv => sv.maSV !== action.maSV)
            return { ...state };
        case "XEM_CHI_TIET":
           state.sinhVienChiTiet = action.sv
            return {...state};
        default:
            return state;

    }

}
