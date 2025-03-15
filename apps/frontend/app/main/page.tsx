'use client';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, LinearProgress } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AppTemplate from '@/components/templates/template';
import * as Actions from '@/store/actions';

class MainPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {};

    this.btnOpen = this.btnOpen.bind(this);
    this.btnSave = this.btnSave.bind(this);
    this.btnCancel = this.btnCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.setAlert(null);
    this.props.actions.fetchUsers();
  }

  btnOpen(data: any) {
    if (data.isEdit) {
      this.setState(data);
      this.props.actions.setAlert(null);
      this.props.actions.setModalOpen(true);
      return;
    }
    if (data.isDelete) {
      this.props.actions.deleteUser(data.id).then(() => {
        this.props.actions.fetchUsers();
      });
      return;
    }
    this.setState({ id: '', name: '', email: '', phone: '' });
    this.props.actions.setAlert(null);
    this.props.actions.setModalOpen(true);
  }

  btnSave = () => {
    if ((this.state.name ?? '').trim() == '' || (this.state.email ?? '').trim() == '' || (this.state.phone ?? '').trim() == '') {
      this.props.actions.setAlert('error', 'Please enter all required fields');
      return;
    }
    if ((this.state.id ?? '') != '') {
      this.props.actions.updateUser(this.state, this.state.id).then(() => {
        this.props.actions.fetchUsers();
        this.btnCancel();
      });
      return;
    }
    this.props.actions.createUser(this.state).then(() => {
      this.props.actions.fetchUsers();
      this.btnCancel();
    });
  }

  btnCancel = () => {
    this.props.actions.fetchUsers();
    this.props.actions.setModalOpen(false);
    if (this.props.alert == 'error') this.props.actions.setAlert(null);
  }

  render() {
    const { users, alert, message, isLoading, isModalOpen } = this.props;

    return (
      <AppTemplate {...this.props}>
        <Grid container spacing={2} justifyContent="space-between" sx={{ marginX: '17px' }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '70%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginTop: '10px' }}
          >
            Contacts
          </Typography>
          <IconButton edge="end" aria-label="add" sx={{ marginTop: '15px' }} onClick={() => this.btnOpen({})}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
        {alert != null && !isModalOpen ? (
          <Alert severity={alert}>{message}</Alert>
        ) : null}
        {isLoading ? (
          <LinearProgress />
        ) : null}
        <List>
          {users.map((user: any, idx: any) => {
            return (
              <ListItem
                key={idx}
                secondaryAction={
                  <>
                    <Link href="#" onClick={() => this.btnOpen({ ...user, isEdit: true })}>
                      <EditIcon />
                    </Link>
                    <Link href="#" onClick={() => this.btnOpen({ ...user, isDelete: true })}>
                      <DeleteIcon />
                    </Link>
                  </>
                }>
                <ListItemAvatar>
                  <Avatar sx={{ width: 42, height: 42 }}>
                    <AccountCircleIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name ?? '-'}
                  secondary={
                    <>
                      <span>{user.email ?? '-'}</span>
                      <br />
                      <span>{user.phone ?? '-'}</span>
                    </>
                  }
                />
              </ListItem>
            )
          })}
        </List>
        <Dialog
          open={isModalOpen}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "450px",
              },
            },
          }}
        >
          <DialogTitle>Entry Contact</DialogTitle>
          <DialogContent>
            {alert != null && isModalOpen ? (
              <Alert severity={alert}>{message}</Alert>
            ) : <></>}
            <TextField type="text" margin="dense" label="Name *" fullWidth variant="standard"
              value={this.state.name ?? ''}
              onChange={(e) => { this.setState({ name: e.target.value }); }} />
            <TextField type="text" margin="dense" label="Email *" fullWidth variant="standard"
              value={this.state.email ?? ''}
              onChange={(e) => { this.setState({ email: e.target.value }); }} />
            <TextField type="text" margin="dense" label="Phone *" fullWidth variant="standard"
              value={this.state.phone ?? ''}
              onChange={(e) => { this.setState({ phone: e.target.value }); }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.btnCancel}>Cancel</Button>
            <Button onClick={this.btnSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </AppTemplate>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    users: state.user.userList,
    alert: state.user.alert,
    message: state.user.message,
    isLoading: state.user.isLoading,
    isModalOpen: state.user.isModalOpen
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(Object.assign({}, Actions), dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);