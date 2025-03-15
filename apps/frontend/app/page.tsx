'use client';
import * as React from 'react';
import { redirect } from 'next/navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AppTemplate from '@/components/templates/template';
import * as Actions from '@/store/actions';

class LoginPage extends React.Component {
  constructor(props: {}, context: any) {
    super(props, context);

    this.state = {};

    this.btnLogin = this.btnLogin.bind(this);
  }

  btnLogin = () => {
    if ((this.state.email ?? '').trim() == '' || (this.state.password ?? '').trim() == '') {
      this.props.actions.setAlert('error', 'Please enter user or password');
      return;
    }
    this.props.actions.authLogin(this.state).then(() => {
      redirect('/main');
    });
  }

  render() {
    const { auth, alert, message } = this.props;

    return (
      <AppTemplate {...this.props}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign in
        </Typography>
        {alert != null ? (
          <Alert severity={alert}>{message}</Alert>
        ) : <></>}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              value={this.state.email ?? ''}
              onChange={(e) => { this.setState({ email: e.target.value }); }} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              type="password"
              placeholder="••••••"
              autoFocus
              required
              fullWidth
              variant="outlined"
              value={this.state.password ?? ''}
              onChange={(e) => { this.setState({ password: e.target.value }); }} />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            onClick={this.btnLogin}
          >
            Sign in
          </Button>
        </Box>
      </AppTemplate>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.user.userAuth,
    alert: state.user.alert,
    message: state.user.message
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(Object.assign({}, Actions), dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);