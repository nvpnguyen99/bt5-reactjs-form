import React, { Component } from 'react'
import { connect } from 'react-redux';

class FormDangKy extends Component {

  state = {
    values: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: ""
    },
    errors: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: ""
    }
  }

  handleOnChange = (event) => {
    let { value, name } = event.target;

    let newValues = { ...this.state.values };
    newValues[name] = value;

    let messageError = "";
    //lấy dữ liệu thuộc tính tự tạo của thẻ (không thể dùng bóc tách như các thuộc tính có sẵn)
    let typeform = event.target.getAttribute("typeform");
    //Kiểm tra rỗng
    if (value.trim() === "") {
      messageError = `${name} không được để trống`;
    }
    //Kiểm tra email
    let regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (typeform == "email") {
      if (!regexp.test(value)) {
        messageError = `Email không đúng định dạng`;
      }
    }
    
    if(typeform == "maSV"){
      let svTK = this.props.mangSinhVien.find(sv => sv.maSV === value)
      if(svTK){
        messageError = `Mã SV ${value} đã được đăng ký`;
      }
    }
    let newErrors = { ...this.state.errors };
    newErrors[name] = messageError;

    this.setState({
      values: newValues,
      errors: newErrors
    })
  }

  handleOnSubmit = (event) => {
    //ngăn hành động load lại trang khi submit
    event.preventDefault();

    let isValid = true;
    //kiểm tra errors còn chứa nội dung nào lỗi không
    for (const property in this.state.errors) {
      if (this.state.errors[property] !== "") {
        isValid = false;
      }
    }

    //kiểm tra dữ liệu rỗng khi user không đổi giá trị (không chạy onChange)
    for (const property in this.state.errors) {
      if (this.state.values[property] === "") {
        //người dùng không điền
        isValid = false;
      }
    }

    if (isValid) {
      let action = {}
      if(this.props.button == "add"){
         action = {
          type: "THEM_SV",
          sv: this.state.values
        }
      } else {
        action = {
          type: "CAPNHAT_SV",
          sv: this.state.values
        }
      }
     
      this.props.dispatch(action)
    } else {
      alert("Form không hợp lệ");
    }
  }

  renderMaSV = (maSV) => {
    let maSVReadOnly = false;
    let maSVCss = {};
    let capNhatInfo = "";
    if (this.props.button == "update") {
      maSVReadOnly = true;
      maSVCss = {backgroundColor: "#ffcca7"};
      capNhatInfo = `Cập nhật dữ liệu sinh viên có mã SV: ${maSV}`
    }
    return <div className="col">
      <label htmlFor="">Mã SV </label>
      <input style={maSVCss} value={maSV} onChange={(event) => {
        this.handleOnChange(event)
      }} name='maSV' type="text" readOnly={maSVReadOnly} typeform='maSV' className="form-control" placeholder="Mã SV" />
      <p className='text-info'>{capNhatInfo}</p>
      <p className='text-danger'>{this.state.errors.maSV}</p>
    </div>
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      values: newProps.sinhVienChiTiet
    })
  }


  render() {
    // let {maSV, hoTen, sdt, email} = this.props.sinhVienChiTiet;
    let { maSV, hoTen, sdt, email } = this.state.values;
    return (
      <div className="row">
        <div className="col-12">
          <h2 className='bg-dark text-white'>Form Đăng Ký</h2>
          <form onSubmit={this.handleOnSubmit}>
            <div className="row">
              {this.renderMaSV(maSV)}
              <div className="col">
                <label htmlFor="">Họ tên</label>
                {/* rút gọn (tự điền event) */}
                <input value={hoTen} onChange={this.handleOnChange} name="hoTen" type="text" className="form-control" placeholder="Họ tên" />
                <p className='text-danger'>{this.state.errors.hoTen}</p>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="">Số điện thoại</label>
                <input value={sdt} onChange={this.handleOnChange} name='sdt' type="text" className="form-control" placeholder="Số điện thoại" />
                <p className='text-danger'>{this.state.errors.sdt}</p>
              </div>
              <div className="col">
                <label htmlFor="">Email</label>
                <input value={email} onChange={this.handleOnChange} name="email" typeform="email" type="text" className="form-control" placeholder="Email" />
                <p className='text-danger'>{this.state.errors.email}</p>
              </div>
            </div>
            <div>
              <button className="btn btn-success">Thêm / Cập nhật</button>
              <button type='button' onClick={() => {
                let action = {
                  type: "RESET_FORM",
                  button: "add"
                }

                this.setState({
                  ...this.state,
                  errors: {
                    maSV: "",
                    hoTen: "",
                    sdt: "",
                    email: ""
                  }
                })

                this.props.dispatch(action)
              }} className="btn btn-info mx-2">Reset</button>
            </div>
          </form>


        </div>
      </div>
    )
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    mangSinhVien: rootReducer.QLSVReducer.mangSinhVien,
    sinhVienChiTiet: rootReducer.QLSVReducer.sinhVienChiTiet,
    button: rootReducer.QLSVReducer.button
  }
}

export default connect(mapStateToProps)(FormDangKy)