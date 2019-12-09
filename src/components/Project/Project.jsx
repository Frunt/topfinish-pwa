import React from "react";
import Popup from "reactjs-popup";
import {NavLink} from "react-router-dom";
import {vtigerOperationsActions} from '../../_actions/';
import {connect} from "react-redux";
import '../../styles/components/project.sass'
import '../../styles/components/nav-links.sass'
import phone from '../../assets/img/phone-call.svg';
import location from '../../assets/img/placeholder.svg';
import {BackButton} from "..";



class Project extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    const { match: { params } } = this.props;
    this.props.dispatch(vtigerOperationsActions.projectDetails(params.id));
    // this.props.dispatch(vtigerOperationsActions.projectDescr(params.id));
  }
  checker = item => {
    return this.props.project && this.props.project[item] ?  this.props.project[item] : '-';
  };
  descRender = () => {
    return {__html: this.checker('Description').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&nbsp;/gi, ' ')}
  };

  render() {
    console.log(this.props.project);
    const {role} = this.props;
    return (
      <div className='project-holder'>
        <div className='heading-holder'>
          <BackButton/>
          <h1>{this.checker('Project Name')}</h1>
          <span className='project-no'>{this.checker('Referentienummer')}</span>
        </div>
        <div className="info-block f">
          <a className='functional' href={`tel:${this.checker('Contactpersoon telefoonnummer') === '-' ? this.checker('Account telefoonnummer ') : this.checker('Contactpersoon telefoonnummer')}`}><img src={phone} alt=""/></a>
          <div className="row">
            <span className="key">Organisatie</span>
            <span className="value">{this.checker('Accountnaam')}</span>
          </div>
          <div className="row">
            <span className="key">Contactpersoon ter plaatse</span>
            <span className="value">{this.checker('Contactpersoon ter plaatse') === '-' ? this.checker("Account contactpersoon ") : this.checker('Contactpersoon ter plaatse')}</span>
          </div>
          <div className="row">
            <span className="key">Telefoonnummer</span>
            <span className="value">{this.checker('Contactpersoon telefoonnummer') === '-' ? this.checker('Account telefoonnummer ') : this.checker('Contactpersoon telefoonnummer')}</span>
          </div>
        </div>
        <div className="info-block f">
          <a className='functional nav-link' href="#"><img src={location} alt=""/></a>
          <div className="row">
            <span className="key">Werklocatie Straat</span>
            <span className="value">{this.checker('Werklocatie Straat')}</span>
          </div>
          <div className="row">
            <span className="key">Werklocatie Post Code</span>
            <span className="value">{this.checker('Werklocatie postcode')}</span>
          </div>
          <div className="row">
            <span className="key">Werklocatie Plaats</span>
            <span className="value">{this.checker('Werklocatie Plaats')}</span>
          </div>
          <div className="row">
            <span className="key">Werklocatie Land</span>
            <span className="value">{this.checker('Werklocatie Land')}</span>
          </div>
        </div>
        <div className="info-block">
          <div className="row">
            <span className="key">Werkomgeving</span>
            <span className="value">{this.checker('Werkomgeving')}</span>
          </div>
          <div className="row">
            <span className="key">Type werklocatie</span>
            <span className="value">{this.checker('Type werklocatie')}</span>
          </div>
          <div className="row">
            <span className="key">Hoogwerker nodig?</span>
            <span className="value">{this.checker('Hoogwerker nodig ?')}</span>
          </div>
          <div className="row">
            <span className="key">Hoogte</span>
            <span className="value">{this.checker('Hoogte')}</span>
          </div>
          <div className="row">
            <span className="key">Aanmeldingsprocedure?</span>
            <span className="value">{this.checker('Aanmeldingsprocedure ?')}</span>
          </div>
          <div className="row">
            <span className="key">Aanvullende PBM eisen?</span>
            <span className="value">{this.checker('Aanvullende PBM eisen ?')}</span>
          </div>
        </div>
        <div className="info-block">
          <div className="row">
            <span className="key">Wie regelt de hoogwerker?</span>
            <span className="value">{this.checker('Wie regelt de hoogwerker ?')}</span>
          </div>
          <div className="row">
            <span className="key">Soort ondergrond voor hoogwerker</span>
            <span className="value">{this.checker('Soort ondergrond voor hoogwerker')}</span>
          </div>
          <div className="row">
            <span className="key">Belasting van de ondergrond</span>
            <span className="value">{this.checker('Belasting van de ondergrond')}</span>
          </div>
          <div className="row">
            <span className="key">Vlakte ondergrond</span>
            <span className="value">{this.checker('Vlakte ondergrond')}</span>
          </div>
        </div>
        <div className="info-block">
          <div className="row">
            <span className="key">Foto-info</span>
            <a href={this.checker('Foto-info')} className="value elipsis">{this.checker('Foto-info')}</a>
          </div>
        </div>
        <div className="info-block d">
          <div className={'desc'} dangerouslySetInnerHTML={this.descRender()}></div>
        </div>

        <div className="button-holder">
          {/*<NavLink to={'/'} disabled className='button'>Materialen</NavLink>*/}
          <NavLink to={`/projects/${this.props.match.params.id}/comments`} className='button'>Commentaar</NavLink>
          <NavLink to={`/projects/${this.checker('ProjectId')}/workorder`} className="button">Werkbonnen</NavLink>
          {role.role_name === 'Projectleider Buitendienst' && (this.props.project && this.props.project.all_project_tasks_completed ? <NavLink to={`/projects/${this.props.match.params.id}/signature`} className='button'>Handtekening</NavLink> : <Popup modal closeOnDocumentClick trigger={<button className="button">Handtekening</button>}>
            <div className='modal'>
              <span>Project kan niet afgesloten worden, want er zijn nog open Werkbonnen. Actie: zorg dat alle Werkbonnen afgerond zijn.</span>
            </div>
          </Popup>)}
          {/*<NavLink disabled className='button small'>Top finish</NavLink>*/}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {project, descr, role} = state.vtigerOperationsReducer;
  return {project, descr, role}
}

Project = connect(mapStateToProps)(Project);
export {Project}
