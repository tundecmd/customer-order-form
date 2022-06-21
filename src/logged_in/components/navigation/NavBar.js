import React, { Fragment, useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Tooltip,
  Box,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ImageIcon from "@mui/icons-material/Image";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MenuIcon from "@mui/icons-material/Menu";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FunctionsIcon from '@mui/icons-material/Functions';
import ReceiptIcon from '@mui/icons-material/Receipt';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';

import MessagePopperButton from "./MessagePopperButton";
import SideDrawer from "./SideDrawer";
import Balance from "./Balance";
import NavigationDrawer from "../../../shared/components/NavigationDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { Signout } from "actions/auth.actions";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  appBarToolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  accountAvatar: {
    backgroundColor: theme.palette.secondary.main,
    height: 24,
    width: 24,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
    },
  },
  drawerPaper: {
    height: "100%vh",
    whiteSpace: "nowrap",
    border: 0,
    width: theme.spacing(7),
    overflowX: "hidden",
    marginTop: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
    backgroundColor: theme.palette.common.black,
  },
  smBordered: {
    [theme.breakpoints.down("sm")]: {
      borderRadius: "50% !important",
    },
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  iconListItem: {
    width: "auto",
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  mobileItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
  },
  username: {
    paddingLeft: 0,
    paddingRight: theme.spacing(2),
  },
  justifyCenter: {
    justifyContent: "center",
  },
  permanentDrawerListItem: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

function NavBar(props) {
  const { selectedTab, messages, classes, openAddBalanceDialog, theme } = props;
  // Will be use to make website more accessible by screen readers
  const links = useRef([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const isWidthUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true);
  }, [setIsMobileOpen]);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);

  const openDrawer = useCallback(() => {
    setIsSideDrawerOpen(true);
  }, [setIsSideDrawerOpen]);

  const closeDrawer = useCallback(() => {
    setIsSideDrawerOpen(false);
  }, [setIsSideDrawerOpen]);

  const dispatch = useDispatch();
  const history = useHistory()

  const handleSignout = () => {
    dispatch(Signout());
    history.push('/signin');
  };

  const menuItems = [
    {
      link: "",
      name: "Dashboard",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <DashboardIcon
            className={
              selectedTab === "Dashboard" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <DashboardIcon className="text-white" />,
      },
    },
    {
      link: "/expected-vehicles",
      name: "Expected Vehcles",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <ElectricCarIcon
            className={
              selectedTab === "Posts" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <ElectricCarIcon className="text-white" />,
      },
    },
    {
      link: "/received-vehicles",
      name: "Received Vehicles",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <DirectionsCarFilledIcon
            className={
              selectedTab === "Posts" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <DirectionsCarFilledIcon className="text-white" />,
      },
    },
    {
      link: "/customer-orders",
      name: "Customer Order Form",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <DynamicFormIcon
            className={
              selectedTab === "Posts" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <DynamicFormIcon className="text-white" />,
      },
    },
    {
      link: "/invoices",
      name: "Invoices",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <ReceiptIcon
            className={
              selectedTab === "Posts" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <ReceiptIcon className="text-white" />,
      },
    },
    {
      link: "/estimations",
      name: "Estimation",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <FunctionsIcon
            className={
              selectedTab === "Posts" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <FunctionsIcon className="text-white" />,
      },
    },
    {
      link: "/job-instructions",
      name: "Job Instruction",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <IntegrationInstructionsIcon
            className={
              selectedTab === "Posts" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <IntegrationInstructionsIcon className="text-white" />,
      },
    },
    {
      link: "/questionnaires",
      name: "Questionnaire",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <QuestionAnswerIcon
            className={
              selectedTab === "Posts" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <QuestionAnswerIcon className="text-white" />,
      },
    },
    {
      link: "/signin",
      name: "Logout",
      onClick: handleSignout,
      icon: {
        desktop: (
          <PowerSettingsNewIcon className="text-white" fontSize="small" />
        ),
        mobile: <PowerSettingsNewIcon className="text-white" />,
      },
    },
  ];
  const auth = useSelector(state => state.auth);
  console.log('auth', auth)

  // if (auth.authenticate === false) {
  //   return;
  // }
  return (
    <Fragment>
      {
        auth.authenticate ? 
      
      <Fragment>
        <AppBar position="sticky" className={classes.appBar} sx={{ backgroundColor: `${theme.palette.primary.main} !important`, width: "100vw !important" }}>
        <Toolbar className={classes.appBarToolbar}>
          <Box display="flex" alignItems="center">
            {/* <Hidden mdDown> */}
              <Box mr={1}>
                <IconButton
                  aria-label="Open Navigation"
                  onClick={openMobileDrawer}
                  size="large"
                  sx={{ color: "#fff" }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            {/* </Hidden> */}
            {/* <Hidden smDown> */}
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="#fff"
              >
                TOY
              </Typography>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="#fff"
              >
                OTA
              </Typography>
            {/* </Hidden> */}
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            {/* {isWidthUpSm && (
              <Box mr={3}>
                <Balance
                  balance={2573}
                  openAddBalanceDialog={openAddBalanceDialog}
                />
              </Box>
            )} */}
            {/* <MessagePopperButton messages={messages} /> */}
            <Link className={classes.menuLink} to="">
              <ListItem
                disableGutters
                className={classNames(classes.iconListItem, classes.smBordered)}
              >
                {
                  !isWidthUpMd && (
                    <Avatar
                      alt="profile picture"
                      src={`${process.env.PUBLIC_URL}/images/logged_in/image2.jpg`}
                      className={classNames(classes.accountAvatar)}
                    />
                  )
                }
                
                {isWidthUpMd && (
                  <ListItemText
                    className={classes.username}
                    primary={
                      <Typography color="#fff">Dashboard</Typography>
                    }
                  />
                )}
              </ListItem>
            </Link>
            <Link className={classes.menuLink} to="/expected-vehicles">
            <ListItem
              disableGutters
              className={classNames(classes.iconListItem, classes.smBordered)}
            >
              {
                !isWidthUpMd && (
                  <Avatar
                    alt="profile picture"
                    src={`${process.env.PUBLIC_URL}/images/logged_in/image7.jpg`}
                    className={classNames(classes.accountAvatar)}
                  />
                ) 
              }
              
              {isWidthUpMd && (
                <ListItemText
                  className={classes.username}
                  primary={
                    <Typography color="#fff">Expected</Typography>
                  }
                />
              )}
            </ListItem>
            </Link>
            <Link className={classes.menuLink} to="/received-vehicles">
            <ListItem
              disableGutters
              className={classNames(classes.iconListItem, classes.smBordered)}
            >
              {
                !isWidthUpMd && (
                  <Avatar
                    alt="profile picture"
                    src={`${process.env.PUBLIC_URL}/images/logged_in/image9.jpg`}
                    className={classNames(classes.accountAvatar)}
                  />
                )
              }
              
              {isWidthUpMd && (
                <ListItemText
                  className={classes.username}
                  primary={
                    <Typography color="#fff">Checked-In/Received</Typography>
                  }
                />
              )}
            </ListItem>
            </Link>
          </Box>
          {/* <IconButton
            onClick={openDrawer}
            color="primary"
            aria-label="Open Sidedrawer"
            size="large"
          >
            <SupervisorAccountIcon />
          </IconButton>
          <SideDrawer open={isSideDrawerOpen} onClose={closeDrawer} /> */}
        </Toolbar>
        </AppBar>
      <Hidden smDown>
        <Drawer //  both drawers can be combined into one for performance
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={false}
        >
          <List>
            {auth.authenticate && menuItems.map((element, index) => (
              <Link
                to={element.link}
                className={classes.menuLink}
                onClick={element.onClick}
                key={index}
                ref={(node) => {
                  links.current[index] = node;
                }}
              >
                <Tooltip
                  title={element.name}
                  placement="right"
                  key={element.name}
                >
                  <ListItem
                    selected={selectedTab === element.name}
                    button
                    divider={index !== menuItems.length - 1}
                    className={classes.permanentDrawerListItem}
                    onClick={() => {
                      links.current[index].click();
                    }}
                    aria-label={
                      element.name === "Logout"
                        ? "Logout"
                        : `Go to ${element.name}`
                    }
                  >
                    <ListItemIcon className={classes.justifyCenter}>
                      {element.icon.desktop}
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
              </Link>
            ))}
          </List>
        </Drawer>
      </Hidden>
      <NavigationDrawer
        menuItems={menuItems.map((element) => ({
          link: element.link,
          name: element.name,
          icon: element.icon.mobile,
          onClick: element.onClick,
        }))}
        anchor="left"
        open={isMobileOpen}
        selectedItem={selectedTab}
        onClose={closeMobileDrawer}
      />
      </Fragment>
    : 

    <Fragment>
      <AppBar position="sticky" className={classes.appBar} sx={{ backgroundColor: `${theme.palette.primary.main} !important` }}>
        <Toolbar className={classes.appBarToolbar}>
          <Box display="flex" alignItems="center">
            <Hidden smDown>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="#fff"
              >
                TOY
              </Typography>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="#fff"
              >
                OTA
              </Typography>
            </Hidden>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            <Link className={classes.menuLink} to="/signup">
            <ListItem
              disableGutters
              className={classNames(classes.iconListItem, classes.smBordered)}
            >
              
              {isWidthUpSm && (
                <ListItemText
                  className={classes.username}
                  primary={
                    <Typography color="#fff">Register</Typography>
                  }
                />
              )}
            </ListItem>
            </Link>
            <Link className={classes.menuLink} to="/signin">
            <ListItem
              disableGutters
              to="/signin"
              className={classNames(classes.iconListItem, classes.smBordered)}
            >
              {/* <Avatar
                alt="profile picture"
                src={`${process.env.PUBLIC_URL}/images/logged_in/profilePicture.jpg`}
                className={classNames(classes.accountAvatar)}
              /> */}
              {isWidthUpSm && (
                <ListItemText
                  className={classes.username}
                  to="/signin"
                  primary={
                    <Typography color="#fff">Login</Typography>
                  }
                />
              )}
            </ListItem>
            </Link>
            {/* <ListItem
              disableGutters
              className={classNames(classes.iconListItem, classes.smBordered)}
            >
              <Avatar
                alt="profile picture"
                src={`${process.env.PUBLIC_URL}/images/logged_in/profilePicture.jpg`}
                className={classNames(classes.accountAvatar)}
              />
              {isWidthUpSm && (
                <ListItemText
                  className={classes.username}
                  primary={
                    <Typography color="textPrimary">Checked-In/Received</Typography>
                  }
                />
              )}
            </ListItem> */}
          </Box>
        </Toolbar>
        </AppBar>
    </Fragment>
    }
    </Fragment>
  );
}

NavBar.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTab: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(NavBar);
