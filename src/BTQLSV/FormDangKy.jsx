import React, { Component } from 'react'

export default class FormDangKy extends Component {

  state = {
    values: {
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

    this.setState({
      values: newValues
    })
  }

  render() {
    return (
      <div className="row">
      <div className="col-12">
          <h2 className='bg-dark text-white'>Form Đăng Ký</h2>
          <form>
              <div className="row">
                  <div className="col">
                      <label htmlFor="">Mã SV</label>
                      <input onChange={(event) => {
                        this.handleOnChange(event)
                      }} name='maSV' type="text" className="form-control" placeholder="Mã SV" />
                  </div>
                  <div className="col">
                      <label htmlFor="">Họ tên</label>
                      {/* rút gọn (tự điền event) */}
                      <input onChange={this.handleOnChange} type="hoTen" className="form-control" placeholder="Họ tên" />
                  </div>
              </div>

              <div className="row">
                  <div className="col">
                      <label htmlFor="">Số điện thoại</label>
                      <input onChange={this.handleOnChange} name='sdt' type="text" className="form-control" placeholder="Số điện thoại" />
                  </div>
                  <div className="col">
                      <label htmlFor="">Email</label>
                      <input onChange={this.handleOnChange} type="email" className="form-control" placeholder="Email" />
                  </div>
              </div>

          </form>
          <div className='py-3'>
              <button className="btn btn-success">Thêm sinh viên</button>
          </div>

      </div>
  </div>
    )
  }
}
