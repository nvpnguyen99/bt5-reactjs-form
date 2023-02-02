import React, { Component } from 'react'
import { connect } from 'react-redux'

class TableSinhVien extends Component {

  renderTableSinhVien = () => {
    return this.props.mangSinhVien.map((sv) => {
      return <tr key={sv.maSV}>
        <td>{sv.maSV}</td>
        <td>{sv.hoTen}</td>
        <td>{sv.sdt}</td>
        <td>{sv.email}</td>
        <td>
          <button onClick={() => {
             let action = {
              type: "XEM_CHI_TIET",
              sv: sv
            }
            this.props.dispatch(action);
          }} className="btn btn-success">Xem</button>
          <button onClick={() => {
            let action = {
              type: "XOA_SV",
              maSV: sv.maSV
            }
            this.props.dispatch(action);
          }} className="btn btn-danger">Xoá</button>
        </td>
      </tr>
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className="row">
        <div className="col-12">
          <table className="table">
            <thead className='bg-dark text-white'>
              <tr>
                <th scope="col">Mã SV</th>
                <th scope="col">Họ tên</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableSinhVien()}
            </tbody>
          </table>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    mangSinhVien: rootReducer.QLSVReducer.mangSinhVien
  }
}

export default connect(mapStateToProps)(TableSinhVien)