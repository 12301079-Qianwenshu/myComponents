import React, { Component } from "react"
import style from "./style.scss"
import Header from 'components/Header'

export default class App extends Component {

  render() {
    return (
      <div id={style["home-page"]}>
        <Header/>
        <div className={style.children}>{this.props.children}</div>
      </div>
    )
  }
}
