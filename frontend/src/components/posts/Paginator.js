import React, {Component} from "react";
import './style.scss'

const Paginator = function (props) {
    const {totalPagesCount} = props;
    var pageButtons = [];
    const onButtonClick = (e) => {
        let el = e.target;
        let dataType = el.attributes["data-type"].textContent;
        if (dataType === 'page') {
            let pageNumber = el.attributes["data-page_number"].textContent;
            props.setPage(pageNumber);
        } else if (dataType === 'prev'){
            let currentPage = props.getPage();
            if (currentPage > 1) {
                props.setPage(currentPage-1);
            }
        } else if (dataType === 'next'){
            let currentPage = props.getPage();
            if (currentPage < totalPagesCount) {
                props.setPage(currentPage+1);
            }
        }
    }

    for (let i = 1; i < totalPagesCount + 1; i++) {
        pageButtons.push(<li key={i} data-type={'page'} data-page_number={i} onClick={onButtonClick}>{i}</li>);
    }

    return (
        <ul id={'paginator'}>
            <li data-type={'prev'} className={'prev'} onClick={onButtonClick}>Prev</li>
            {pageButtons}
            <li data-type={'next'} className={'next'} onClick={onButtonClick}>Next</li>
        </ul>
    )
}

export default Paginator;