import React from "react";
import {NavLink} from "react-router-dom";
import {vtigerOperationsActions} from '../../_actions/';
import {connect} from "react-redux";
import '../../styles/components/project.sass'
import '../../styles/components/nav-links.sass'
import '../../styles/components/button.sass'
// import {getDate, history} from '../../_helpers';
import {BackButton} from "..";
import clock from '../../assets/img/clock.svg';


class WorkorderDetail extends React.Component {
  state = {
    krassen: false,
    deuken: false,
    logging: false,
    time: 0
  };
  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.dispatch(vtigerOperationsActions.projectDetails(params.id));
    this.props.dispatch(vtigerOperationsActions.workorderDetails(params.workorderId));
  }
  openHandler = (event, name) => {
    this.setState({[name]: event.target.checked});
  };
  checker = (item, block) => {
    return this.props.workorderDetails && this.props.workorderDetails[block][item] ?  this.props.workorderDetails[block][item] : '-';
  };

  loggingStartHandler = () => {
    this.setState({logging: !this.state.logging})
  };
  timeCounter = () => {
    // console.log(this.state.time);
    if(this.state.logging) {
      setTimeout(() => this.setState({time: this.state.time + 1}), 1000);
    }
  };
  counerBlockRender = () => {
    if (this.state.logging) {
      const minutes = Math.floor(this.state.time / 60);
      const seconds = this.state.time - minutes * 60;
      return (
        <div className="counter-block">
          <img src={clock} alt=""/>
          <span>
            {`${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`}
          </span>
        </div>
      );
    }
  };
  checkerP = item => {
    return this.props.project && this.props.project[item] ?  this.props.project[item] : '-';
  };
  mapFromObject = (name) => {
    return Object.keys(this.props.workorderDetails[name]).map(e => {
      return (
        <div key={e} className="row">
          <span className="key">{e}:</span>
          <span className="value">{this.checker(e, name)}</span>
        </div>
      );
    })
  };
  infoRender = () => {

    let a = this.props.workorderDetails;
    if (a) {
      if (a['Projecttaak informatie']['Categorie'] === 'Schadeherstel') {
        return (
          <>
          <div className="info-block">
            {this.mapFromObject('Schade herstel')}
          </div>
            <div className="floating-checkbox-holder">
              <label htmlFor="c1">Krassen
                <input onChange={e => this.openHandler(e, 'krassen')} type="checkbox" id='c1' />
                <span></span>
              </label>
            </div>
            <div className={`info-block ${this.state.krassen ? '' : 'hidden'}`}>
              {this.mapFromObject('Krassen')}
            </div>
            <div className="floating-checkbox-holder">
              <label htmlFor="c2">Deuken
                <input onChange={e => this.openHandler(e, 'deuken')} type="checkbox" id='c2' />
                <span></span>
              </label>
            </div>
            <div className={`info-block ${this.state.deuken ? '' : 'hidden'}`}>
              {this.mapFromObject('Deuken')}
            </div>
          </>
        );
      }
      else if (a['Projecttaak informatie']['Categorie'] === 'Restylen') {
        return (
          <div className="info-block">
            {this.mapFromObject('Restylen')}
          </div>
        );
      }
      else if (a['Projecttaak informatie']['Categorie'] === 'Zetwerk') {
        return (
          <div className="info-block">
            {this.mapFromObject('Zetwerk')}
          </div>
        );
      }
      else if (a['Projecttaak informatie']['Categorie'] === 'Panelen vervangen') {
        return (
          <div className="info-block">
            {this.mapFromObject('Panelen vervangen')}
          </div>
        );
      }
      else if (a['Projecttaak informatie']['Categorie'] === 'Reinigen') {
        return (
          <div className="info-block">
            {this.mapFromObject('Reinigen')}
          </div>
        );
      }
    }
  };
  updateStatus = (e) => {
    e.preventDefault();
    this.props.dispatch(vtigerOperationsActions.updateStatus(this.props.match.params.workorderId, this.props.workorderDetails['Projecttaak informatie'].Status));
  };
  descRender = () => {
    return {__html: this.checker('description', 'Omschrijving Details').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&nbsp;/gi, ' ')}
  };
  render() {
    // console.log(this.props.workorderDetails);
    // this.timeCounter();
    return (
      <div className="workorder-detail-holder">
        <div className="heading-holder">
          <BackButton/>
          <h1>{this.checkerP('Project Name')}</h1>
          <span className='project-no'>{this.checkerP('Referentienummer')}</span>
          <h1>{this.checker('Project Task Name', 'Projecttaak informatie')}</h1>
          {this.props.workorderDetails && this.props.workorderDetails['Projecttaak informatie'].Werkomstandigheid ? <span className="project-no">{this.props.workorderDetails['Projecttaak informatie'].Werkomstandigheid}</span> : null}
        </div>
        {/*{this.counerBlockRender()}*/}
        {/*<button onClick={this.loggingStartHandler} className='nav-link'>{this.state.logging ? 'Stop' : 'Check in'}</button>*/}
        {this.infoRender()}
        {this.props.workorderDetails && this.props.workorderDetails['Omschrijving Details'].description ? <div className="info-block d">
          <p className={'desc'} dangerouslySetInnerHTML={this.descRender()}></p>
        </div> : null}
        <div className="button-holder">
          <NavLink to={'/'} className='button'>Materialen</NavLink>
          <NavLink to={`/projects/${this.props.match.params.id}/workorder/${this.props.match.params.workorderId}/photos`} className='button'>Fotos</NavLink>
          <NavLink to={`/`} className='button'>Time sheet</NavLink>
          <button onClick={e => this.updateStatus(e)} className='button'>Afgerond</button>
          <NavLink to={`/projects/${this.props.match.params.id}/workorder/${this.props.match.params.workorderId}/comments`} className='button'>Commentaar</NavLink>
          <NavLink to={'/'} className='button small'>Top finish</NavLink>
        </div>
      </div>
    );
  }
}
// to={`/projects/${this.props.match.params.id}/workorder/`}

function mapStateToProps(state) {
  const {workorderDetails, project} = state.vtigerOperationsReducer;
  return {workorderDetails, project}
}

WorkorderDetail = connect(mapStateToProps)(WorkorderDetail);
export {WorkorderDetail}
