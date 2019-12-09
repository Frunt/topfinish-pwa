import React from "react";
import {NavLink} from "react-router-dom";
import '../../styles/components/nav-links.sass';
import Carousel from 'react-spring-3d-carousel';
import arrowLeft from  '../../assets/img/arrow-left.svg';
import arrowRight from  '../../assets/img/arrow-right.svg';
import {vtigerOperationsActions} from "../../_actions";
import {connect} from "react-redux";
import {Photos} from "..";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [{
                label: 'Nieuw aanbod',
                url: '/'
            }]
        }
    }
    componentDidMount() {
      const {userId} = JSON.parse(localStorage.getItem('user')).info;
      document.getElementsByClassName('css-1qzevvg')[0].firstChild.src = arrowLeft;
      document.getElementsByClassName('css-1qzevvg')[0].lastChild.src = arrowRight;
      this.props.dispatch(vtigerOperationsActions.getRole(userId));
    }

  slides = [
        {
            key: 1,
            content: <NavLink className="nav-link" exact={true} to={'/projects'}>Projecten</NavLink>
        },
        // {
        //     key: 2,
        //     content: <NavLink disabled className="nav-link" exact={true} to={'/'}>Rooster</NavLink>
        // },
        {
            key: 3,
            content: <NavLink disabled className="nav-link" exact={true} to={'/opnamen'}>Opnamen</NavLink>
        },
        // {
        //     key: 4,
        //     content: <NavLink disabled className="nav-link" exact={true} to={'/'}>Contacten</NavLink>
        // },
        {
            key: 5,
            content: <NavLink disabled className="nav-link" exact={true} to={'/today'}>Vandaag</NavLink>
        },
    ];
    render() {
        return (
            <div className="home-holder">
              <div className="heading-holder">
                <h1>Dashboard</h1>
              </div>
              <div className="dashboard-list">
                <Carousel showNavigation={true} slides={this.slides}/>
              </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {};
}
Home = connect(mapStateToProps)(Home);
export {Home}

