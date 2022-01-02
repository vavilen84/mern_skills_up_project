import React, {Component} from "react";
import './style.scss'

const Paginator = function (props) {
    const {totalPagesCount} = props;
    console.log(totalPagesCount);
    var pageButtons = [];
    for (let i = 1; i < totalPagesCount + 1; i++) {
        pageButtons.push(<li key={i}>{i}</li>);
    }
    return (
        <ul id={'paginator'}>
            <li className={'prev'}>Prev</li>
            {pageButtons}
            <li className={'next'}>Next</li>
        </ul>
    )
}

export default Paginator;