import React from "react";
import {usersActions} from "../../_actions";
import {connect} from "react-redux";
import '../../styles/components/login.sass';
import '../../styles/components/form.sass';
import logo from '../../assets/img/logo.svg';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            error: false,
            registrationActive: false,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.login) {
            if(nextProps.login.success){
                console.log(nextProps);
                localStorage.setItem('user', JSON.stringify({
                    info: nextProps.login.result,
                    sessionId: nextProps.login.result.sessionName,
                    username: this.state.name
                }));
                this.props.history.push('/')
            } else {
                this.setState({error: nextProps.login.error});
                const _this = this;
                setTimeout(()=> _this.setState({error: false}), 6000)
            }
        }
    }

    onsubmit = (e) => {
        e.preventDefault();
        const {login, password} = this.state;
        const data = {login, password};
        this.props.dispatch(usersActions.login(data))
    };

    render() {
        return (
            <div className={'login-content'}>
                <video playsInline autoPlay muted loop style={{height: 'auto', left: '50%',minHeight: '100%',minWidth: '100%', position: 'absolute',top: '50%',transform: 'translateX(-50%) translateY(-50%)',width: 'auto',zIndex:-1}}>
                    <source src="https://topfinish.itjourney.nl/710/images/itj_login.mp4" type="video/mp4"/>
                </video>
                <div className={'container'}>
                    <div className="logo">
                        <img src={logo} alt="It journey logo"/>
                    </div>
                    <form noValidate className={'login-form'}>
                        <h1>Log in</h1>
                        <label htmlFor="outlined-name">Login</label>
                        {/*<button onClick={() => this.setState({registerActive: true})}>Create user</button>*/}
                        <input
                            type={'text'}
                            id={'outlined-name'}
                            className={'form-input'}
                            value={this.state.login}
                            onChange={this.handleChange('login')}
                            autoComplete={'username'}
                        />
                        <label htmlFor="outlined-pass">Password</label>
                        <input
                            type={'password'}
                            id={'outlined-pass'}
                            className={'form-input'}
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            autoComplete={'current-password'}
                        />
                        {this.state.error && <><span style={{color: 'red', display: 'block'}}>{this.state.error.message}</span><br/></>}
                        <button type={'submit'} className={'btn'} onClick={this.onsubmit}>
                            Login
                        </button>
                        <a href="https://itjourney.nl/" className={'link'}>Need help?</a>
                    </form>
                </div>
                <div className="login-footer">
                    <div className="container">
                        <span>&copy;</span> 2004-2019 <a href="https://itjourney.nl/">it-journey.nl</a>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const login = state.usersReducer;
    return {login}
}

Login = connect(mapStateToProps)(Login);
export {Login}
