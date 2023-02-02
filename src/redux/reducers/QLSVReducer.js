const initialState = {
    mangSinhVien: [],
    sinhVienChiTiet: {
        // maSV: "sv001",
        // hoTen: "Nguyen Van A",
        // sdt: "0123456",
        // email: "@gmail.com"
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
