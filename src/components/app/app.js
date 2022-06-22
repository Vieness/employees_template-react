import {Component} from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import './app.css'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {name: 'alex', salary: 1500, increase: true, rise: true, id: 1},
                {name: 'max', salary: 1500, increase: true, rise: false, id: 2},
                {name: 'roman', salary: 2500, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'all',
        }
        this.maxId = 4
    }

    onDeleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }
    onToggleIncrease = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })
        }))
    }
    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, rise: !item.rise}
                }
                return item;
            })
        }))
    }
    onUpdateSearch = (term) => {
        this.setState({term});
    }
    searchEmployees = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }
    filterPost = (item, filter) => {
        switch (filter) {
            case 'rise':
                return item.filter(item => item.rise)
            case 'more1000':
                return item.filter(item => item.salary > 1000)
            default:
                return item
        }
    }
    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const {term, data, filter} = this.state
        const employees = this.state.data.length
        const increased = this.state.data.filter(item => item.increase).length
        const visibleData = this.filterPost(this.searchEmployees(data, term), filter)

        return (
            <div className='app'>
                <AppInfo
                    employees={employees}
                    increased={increased}
                />
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList
                    data={visibleData}
                    onDelete={this.onDeleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}
                />
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;