import React, { Component } from "react"
import style from "./style.scss"
import { NavLink, withRouter } from 'react-router-dom'

class Login extends Component {

  render() {
    const list = [{
      text: '我的组件',
      url: '/demo/1'
    }];

    return (
      <div className={style.container}>
        {
          list.map((item, index) => (
            <NavLink to={item.url} activeClassName={style.active} key={index}>{item.text}</NavLink>
          ))
        }
      </div>
    )
  }
}

export default withRouter(Login);
