const initialState = {
    mangSinhVien: [],
    sinhVienChiTiet: {
        maSV: "",
        hoTen: "",
        sdt: "",
        email: ""
    }, button: "add"
}

export const QLSVReducer = (state = initialState, action) => {
    switch (action.type) {
        case "THEM_SV":
            state.mangSinhVien = [...state.mangSinhVien, action.sv]
            console.log("THEM")
            return { ...state };

        case "XOA_SV":
            state.mangSinhVien = state.mangSinhVien.filter(sv => sv.maSV !== action.maSV)
            return { ...state };
        case "XEM_CHI_TIET":
            state.sinhVienChiTiet = action.sv
            state.button = "update"
            return { ...state };
        case "CAPNHAT_SV":  
            let mangSinhVienCapNhat = [...state.mangSinhVien]
            let index = mangSinhVienCapNhat.findIndex(sv => sv.maSV === action.sv.maSV)
            if(index !== -1){
                mangSinhVienCapNhat[index]= action.sv
            }
            state = {
                mangSinhVien: mangSinhVienCapNhat,
                sinhVienChiTiet: {
                    maSV: "",
                    hoTen: "",
                    sdt: "",
                    email: ""
                }, button: "add"
            }
            return { ...state };
        case "RESET_FORM":
            state = {
                ...state,
                sinhVienChiTiet: {
                    maSV: "",
                    hoTen: "",
                    sdt: "",
                    email: ""
                }, button: "add"
            }
            return { ...state };
        default:
            return state;

    }

}
