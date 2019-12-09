import React, {Component} from 'react';
import {Route, Router, Switch} from "react-router-dom";
import {history, PrivateRouteAdmin} from './_helpers'
import {Home, Opnamen, Login, Projects, Project, Workorder, WorkorderDetail, Comments, Photos, Signature, Location} from "./components";
import {AdminLayout} from "./_layouts";
import {connect} from "react-redux";
// import {gulfServices} from "./_services";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Switch>
                        <PrivateRouteAdmin layout={AdminLayout} component={Home} path={'/'} exact/>
                        <PrivateRouteAdmin layout={AdminLayout} component={Comments} path={'/projects/:id/comments'} exact/>
                        <PrivateRouteAdmin layout={AdminLayout} component={Location} path={'/projects/:id/location'} exact/>
                        <PrivateRouteAdmin layout={AdminLayout} component={Comments} path={'/projects/:id/workorder/:workorderId/comments'} exact/>
                        <PrivateRouteAdmin layout={AdminLayout} component={Signature} path={'/projects/:id/signature'} exact/>
                        <PrivateRouteAdmin layout={AdminLayout} component={Photos} path={'/projects/:id/workorder/:workorderId/photos'} exact/>
                        <PrivateRouteAdmin layout={AdminLayout} component={Projects} path={'/projects'} exact/>
                        <PrivateRouteAdmin layout={AdminLayout} component={Opnamen} path={'/opnamen'} exact/>
                        <PrivateRouteAdmin layout={AdminLayout} component={Projects} path={'/today'} exact/>
                        <PrivateRouteAdmin layout={AdminLayout} component={Project} path={'/projects/:id'} exact/>
                        <PrivateRouteAdmin layout={AdminLayout} component={Workorder} path={'/projects/:id/workorder'} exact/>
                        <PrivateRouteAdmin layout={AdminLayout} component={WorkorderDetail} path={'/projects/:id/workorder/:workorderId'} exact/>
                        <Route component={Login} exact path={'/login'}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default connect()(App);
