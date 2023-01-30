import React, { Component } from 'react'

export default class BTQLSV extends Component {
    render() {
        return (
            <div className='container py-5'>
                <div className="row">
                    <div className="col-12">
                        <h2 className=''>Form Đăng Ký</h2>
                        <form>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor>Mã SV</label>
                                    <input name='maSV' type="text" className="form-control" placeholder="Mã SV" />
                                </div>
                                <div className="col">
                                    <label htmlFor>Họ tên</label>
                                    <input type="hoTen" className="form-control" placeholder="Họ tên" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor>Số điện thoại</label>
                                    <input name='sdt' type="text" className="form-control" placeholder="Số điện thoại" />
                                </div>
                                <div className="col">
                                    <label htmlFor>Email</label>
                                    <input type="email" className="form-control" placeholder="Email" />
                                </div>
                            </div>

                        </form>
                        <div className='py-3'>
                             <button className="btn btn-success">Thêm sinh viên</button>
                        </div>
                      
                    </div>
                </div>
            </div>
        )
    }
}
