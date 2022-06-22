import React from 'react';
import './app-filter.css'

const AppFilter = (props) => {
    const buttonsData = [
        {name: 'all', label: 'All employee'},
        {name: 'rise', label: 'Salary increase'},
        {name: 'more1000', label: 'Salary over 1000$'},
    ]

    const buttons = buttonsData.map(({name,label})=>{
        const active = props.filter === name;
        const clazz = active ? 'btn btn-light' : 'btn btn-outline-light'
        return (
            <button
                className={clazz}
                type='button'
                key={name}
                onClick={()=>{props.onFilterSelect(name)}}
            >
                {label}
            </button>
        )
    })

    return (
        <div className='btn-group'>
            {buttons}
        </div>
    );
};

export default AppFilter;
