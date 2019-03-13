import React, { Component } from "react"
import style from "./style.scss"
import { withRouter } from "react-router"
import { Bread, Modal } from 'components'


class Login extends Component {
  state = {
    visible: false
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  showModal = () => {
    console.log("打开弹窗被点击了")
    this.setState({
      visible: true
    })
  }

  onConfirm = () => {
    console.log("确定按钮被点击了")
  }

  render() {
    const breads = ['首页', '个人中心'];
    const { visible } = this.state;
    return (
      <div className={style.container}>
        <Bread list={breads}></Bread>
        <Modal
          visible={visible}
          title="标题"
          onClose={this.onClose}
          onConfirm={this.onConfirm}
        >
          <div className={style.cont}>我是弹窗的孩子</div>
        </Modal>
        <span onClick={() => this.showModal()}>打开弹窗</span>
      </div>
    )
  }
}

export default withRouter(Login);
