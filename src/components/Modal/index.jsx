/*
 * @Author: shuqianwen 
 * @Date: 2019-03-12 15:37:31 
 * @Last Modified by: shuqianwen
 * @Last Modified time: 2019-03-13 09:53:27
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import style from './style.scss'
import { uuid, compile } from 'utils'


/**
 * @description 弹窗组件
 * @class Modal
 * @extends {Component}
 */
let clientX = 0;
let clientY = 0;
let timer = null;

class Modal extends Component {
    constructor(props) {
        super(props);
        // 若传入的组件参数visible=true,则弹窗可见
        if (props.visible) {
            this.state.show = true;
        }

        this.id = 'modal-' + uuid();
        // 从传入的参数中获取弹窗初始位置
        const { initPosition = {} } = props;
        clientX = initPosition.clientX || clientX;
        clientY = initPosition.clientX || clientY;
    }

    state = {
        show: false,
        clientX: 0,
        clientY: 0
    }

    /**
     * @description 弹窗关闭
     * @memberof Modal
     */
    onClose = () => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    /**
     * @description 确定按钮点击
     * @memberof Modal
     */
    onConfirm = () => {
        const doms = document.querySelectorAll(`#${this.id} [data-key]`);
        console.log(doms)
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }

    /**
     * @description 根据实时接收的props设置弹窗关闭/打开
     * @param {*} nextProps
     * @memberof Modal
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.visible && !this.props.visible) {
            this.setState({
                show: true
            })
        }
        if (!nextProps.visible && this.props.visible) {
            this.setState({
                show: false
            })
        }
    }

    render() {
        // 组件接收的参数有：
        const {
            className, // 用户自定义类名
            title, // 弹窗标题
            visible, // 弹窗是否可见
            noFooter, // 弹窗是否有底部
        } = this.props;
        const { show, clientX, clientY } = this.state;
        // 传入的弹窗style，进行合并
        const propStyle = Object.assign(this.props.style || {}, {
            left: clientX,
            top: clientY
        });

        if (!show) {
            return null;
        }

        return (
            <div className={`${style.wrap} ${visible ? style.wrapEnter : style.wrapLeave}`} id={this.id}>
                <div className={`${style.container} ${visible ? style.mainEnter : style.mainLeave} ${className || ''}`}>
                    <div className={style.header}>
                        <p>{title}</p>
                        <i className={`iconfont ${style.close}`} onClick={this.onClose}>&#xe605;</i>
                    </div>
                    <div className={style.content}>
                        {this.props.children}
                    </div>
                    {
                        noFooter ? null :
                            <div className={style.footer}>
                                <button className={`${style.button} ${style.confirm}`} onClick={this.onConfirm}>确定</button>
                                <button className={`${style.button} ${style.cancle}`} onClick={this.onClose}>取消</button>
                            </div>
                    }
                </div>
            </div>

        );
    }
}

export default withRouter(Modal);