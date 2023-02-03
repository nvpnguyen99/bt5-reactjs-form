import React, { Component } from 'react'
import { connect } from 'react-redux'


class TableSinhVien extends Component {

  state = {
    keyword: ""
  }

  handleOnChange = (event) => {
    this.setState({
      keyword: event.target.value
    })
  }

  renderTableSinhVien = () => {
    let keyWordSearch = this.state.keyword.toLowerCase().replace(/\s/g, "");
    let mangTK = this.props.mangSinhVien.filter((sv) => {
      let maSVTK = sv.maSV.toLowerCase().replace(/\s/g, "");
      let hoTenTK = sv.hoTen.toLowerCase().replace(/\s/g, "");
          return (maSVTK.indexOf(keyWordSearch) > -1) || (hoTenTK.indexOf(keyWordSearch) > -1)
    })
    return mangTK.map((sv) => {
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

  componentWillReceiveProps(newProps) {
    this.setState({
      keyword: ""
    })
  }

  render() {
    return (
      <>
        <form>
          <div className="input-group mt-5 mb-2">
            <div className="input-group-prepend">
              <button id="button-addon8" type="submit" className="btn btn-primary"><i className="fa fa-search" /></button>
            </div>
            <input onChange={this.handleOnChange} value={this.state.keyword} name="keyword" type="search" placeholder="Nhập từ bạn cần tìm?" aria-describedby="button-addon8" className="form-control" />
          </div>

        </form>



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
      </>

    )
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    mangSinhVien: rootReducer.QLSVReducer.mangSinhVien
  }
}

export default connect(mapStateToProps)(TableSinhVien)