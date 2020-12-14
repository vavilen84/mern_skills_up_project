import React from "react";

export function List (props) {
    let list = '';
    if (props.items.errors) {
        let listItems = Object.entries(props.items.errors).map(function(data, index){
            return (
                <li key={index}>{data[0]}: {data[1]}</li>
            )
        });
        list = <ul>{listItems}</ul>;
    }

    return (
        list
    );
}
