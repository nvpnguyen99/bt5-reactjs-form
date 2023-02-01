import React, { Component } from 'react'

export default class FormDangKy extends Component {

  state = {
    values: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: ""
    },
    errors:{
      maSV: "",
      hoTen: "",
      sdt: "",
      email: ""
    }
  }

  handleOnChange = (event) => {
    let {value, name}= event.target;

    let newValues = { ...this.state.values};
    newValues[name] = value;

    let messageError = "";
    //lấy dữ liệu thuộc tính tự tạo của thẻ (không thể dùng bóc tách như các thuộc tính có sẵn)
    let typeform = event.target.getAttribute("typeform");
    //Kiểm tra rỗng
    if(value.trim() === ""){
      messageError = `${name} không được để trống`;
    }
    //Kiểm tra email
    let regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(typeform == "email"){
      if(!regexp.test(value)){
        messageError = `Email không đúng định dạng`;
      }
    }

    let newErrors = {...this.state.errors};
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
      if(this.state.errors[property] !== ""){
        isValid = false;
      }
    }

    //kiểm tra dữ liệu rỗng khi user không đổi giá trị (không chạy onChange)
      for (const property in this.state.errors) {
        if(this.state.values[property] === ""){
          //người dùng không điền
          isValid = false;
        }
      }

    if(isValid){
      
    } else{
      alert("Form không hợp lệ");
    }
  }


  render() {
    return (
      <div className="row">
      <div className="col-12">
          <h2 className='bg-dark text-white'>Form Đăng Ký</h2>
          <form onSubmit={this.handleOnSubmit}>
              <div className="row">
                  <div className="col">
                      <label htmlFor="">Mã SV</label>
                      <input onChange={(event) => {
                        this.handleOnChange(event)
                      }} name='maSV' type="text" className="form-control" placeholder="Mã SV" />
                      <p className='text-danger'>{this.state.errors.maSV}</p>
                  </div>
                  <div className="col">
                      <label htmlFor="">Họ tên</label>
                      {/* rút gọn (tự điền event) */}
                      <input onChange={this.handleOnChange} name="hoTen" type="text" className="form-control" placeholder="Họ tên" />
                       <p className='text-danger'>{this.state.errors.hoTen}</p>
                  </div>
              </div>

              <div className="row">
                  <div className="col">
                      <label htmlFor="">Số điện thoại</label>
                      <input onChange={this.handleOnChange} name='sdt' type="text" className="form-control" placeholder="Số điện thoại" />
                        <p className='text-danger'>{this.state.errors.sdt}</p>
                  </div>
                  <div className="col">
                      <label htmlFor="">Email</label>
                      <input onChange={this.handleOnChange} name="email" typeform="email" type="text" className="form-control" placeholder="Email" />
                        <p className='text-danger'>{this.state.errors.email}</p>
                  </div>
              </div>
              <div className='py-3'>
              <button className="btn btn-success">Thêm sinh viên</button>
              </div>
          </form>
     

      </div>
  </div>
    )
  }
}
