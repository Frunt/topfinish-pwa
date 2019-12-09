import React, {Component} from 'react';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import {connect} from "react-redux";
import {usersActions} from "../_actions";
import menu from '../assets/img/menu.svg';
import '../styles/components/header.sass'
import {NavLink} from "react-router-dom";

class AdminLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebar: false,
            list: [{
                title: 'Dashboard',
                link: '/',
                icon: 'home'
            }, {
                title: 'List',
                link: '/list',
                icon: 'view_list'
            }],
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    toggleDrawer(open) {
        this.setState({
            sidebar: open,
        });
    };

    goTo = (link) => () => {
        this.props.history.push(link);
        this.toggleDrawer(false);
    };

    logout = () => {
        this.props.dispatch(usersActions.logout())
    };

    render() {
        return (
            <>
                <header className={'main-header'}>
                    <SwipeableDrawer
                        open={this.state.sidebar}
                        anchor="right"
                        onClose={() => this.toggleDrawer(false)}
                        onOpen={() => this.toggleDrawer(true)}
                    > <div className="sidebar-holder">
                        <strong>Welcome {this.state.user.username}</strong>
                        <List>
                            <NavLink className="nav-link" exact={true} to={'/projects'}>Projecten</NavLink>
                            <NavLink className="nav-link" exact={true} to={'/today'}>Vandaag</NavLink>
                            <NavLink className="nav-link" exact={true} to={'/opnamen'}>Opnamen</NavLink>
                            <button type={'button'} className={'nav-link'} onClick={this.logout}>Logout</button>
                        </List>
                    </div>
                    </SwipeableDrawer>
                    <div className="container">
                        <button type={'button'} className={'burger'} onClick={() => this.toggleDrawer(true)}>
                            <img src={menu} alt="Open menu"/>
                        </button>
                    </div>
                </header>
                <main className="container">
                    {this.props.children}
                </main>
            </>

        );
    }
}

AdminLayout = connect()(AdminLayout);
export {AdminLayout};
