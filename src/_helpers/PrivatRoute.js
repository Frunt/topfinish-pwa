import React from "react";
import {Route, Redirect} from 'react-router-dom';
import {getToken} from "./helpers";

export const PrivateRouteAdmin = ({layout, component, ...rest}) => {
  // console.log(getToken());
    return layout ? (
      <Route {...rest} render={props => (
        getToken()
          ? React.createElement(layout, props, React.createElement(component, props))
          : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
      )}/>
    ) :  getToken() ? <Route component={component} {...rest}/> : <Redirect to={{pathname: '/login'}}/>;
};
