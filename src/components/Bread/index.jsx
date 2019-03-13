/*
 * @Author: shuqianwen 
 * @Date: 2019-03-12 10:00:58 
 * @Last Modified by: shuqianwen
 * @Last Modified time: 2019-03-12 15:33:37
 */


import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import style from './style.scss';

/**
 * @description 面包屑组件
 * @class Bread
 * @extends {Component}
 */
class Bread extends Component {
    render() {
        const { list = [] } = this.props;
        return (
            <div className={style.container}>
                <i className="iconfont">&#xe676;</i>
                {
                    list && list.length ?
                        list.map((item, index) => {
                            return ([
                                <span key={index + '1'}>{item}</span>,
                                index < list.length - 1 ?
                                    (<span key={index + '2'}>></span>)
                                    : null])
                        }) : null
                }
            </div>
        );
    }
}

export default withRouter(Bread);