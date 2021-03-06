import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    IconButton,
    Avatar,
    Box,
    Accordion,
    AccordionSummary,
    Typography,
    Card,
    Divider,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Menu,
    MenuItem,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import PlayCirlceOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EnhancedTableHead from "../../../shared/components/EnhancedTableHead";
import stableSort from "../../../shared/functions/stableSort";
import getSorting from "../../../shared/functions/getSorting";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";
// import ExpectedVehicleDialog from "../../../shared/components/ConfirmationDialog";
import ColorfulChip from "../../../shared/components/ColorfulChip";
import currencyPrettyPrint from "../../../shared/functions/currencyPrettyPrint";
import theme from "../../../theme";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerOrder } from "actions";
import ButtonCircularProgress from "shared/components/ButtonCircularProgress";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const styles = (theme) => ({
    tableWrapper: {
        overflowX: "auto",
        backgroungColor: "#fff !important",
    },
    alignRight: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        paddingLeft: theme.spacing(2),
    },
    blackIcon: {
        color: theme.palette.common.black,
    },
    avatar: {
        width: 28,
        height: 28,
    },
    firstData: {
        paddingLeft: theme.spacing(3),
    },
    iconButton: {
        padding: theme.spacing(1),
    },
    dBlock: {
        display: "block",
    },
    dNone: {
        display: "none",
    },
});

const rows = [
    //   {
    //     id: "icon",
    //     numeric: true,
    //     label: "",
    //   },
    {
        id: "Vehicle_Registration_No",
        numeric: false,
        label: "Reg No",
    },
    { id: "Model_Name", numeric: false, label: "Model Name" },
    { id: "Customer_Name", numeric: false, label: "Customer Name" },
    { id: "Time_Received", numeric: false, label: "Time Received" },
    {
        id: "Stage",
        numeric: false,
        label: "Stage",
    },
    {
        id: "actions",
        numeric: false,
        label: "",
    },
];

const rowsPerPage = 10;

function CustomDataTable(props) {
    const {
        pushMessageToSnackbar,
        classes,
        targets,
        setTargets,
        title,
        emptyLineNotification,
        selectRow,
        selectRowCheckedIn,
        selectRowReceivedIn,
        customerOrder,
    } = props;

    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState(null);
    const [page, setPage] = useState(0);
    const [isDeleteTargetDialogOpen, setIsDeleteTargetDialogOpen] =
        useState(false);
    const [deleteTargetDialogRow, setDeleteTargetDialogRow] = useState(null);
    const [isDeleteTargetLoading, setIsDeleteTargetLoading] = useState(false);
    const [isCheckInLoading, setIsCheckInLoading] = useState(false);

    const [isExpectedVehicleDialogOpen, setIsExpectedVehicleDialogOpen] =
        useState(false);
    const [selectExpectedVehicleDialogRow, setSelectExpectedVehicleDialogRow] =
        useState(null);
    const [isCheckInVehicleLoading, setIsCheckInVehicleLoading] =
        useState(false);

    const [selectedExpectedVehicle, setSelectedExpectedVehicle] =
        useState(null);
    const [selectedCustomerOrder, setSelectedCustomerOrder] = useState({});
    const customerOrderList = useSelector(
        (state) => state.customerOrder.customerOrderList
    );

    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const handleRequestSort = useCallback(
        (__, property) => {
            const _orderBy = property;
            let _order = "desc";
            if (orderBy === property && order === "desc") {
                _order = "asc";
            }
            setOrder(_order);
            setOrderBy(_orderBy);
        },
        [setOrder, setOrderBy, order, orderBy]
    );

    const deleteTarget = useCallback(() => {
        setIsDeleteTargetLoading(true);
        setTimeout(() => {
            setIsDeleteTargetDialogOpen(false);
            setIsDeleteTargetLoading(false);
            const _targets = [...targets];
            const index = _targets.findIndex(
                (element) => element.id === deleteTargetDialogRow.id
            );
            _targets.splice(index, 1);
            setTargets(_targets);
            pushMessageToSnackbar({
                text: "Your friend has been removed",
            });
        }, 1500);
    }, [
        setIsDeleteTargetDialogOpen,
        setIsDeleteTargetLoading,
        pushMessageToSnackbar,
        setTargets,
        deleteTargetDialogRow,
        targets,
    ]);

    function dateParserwithArgument(date) {
        let today = new Date(date);
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        return today;
    }

    function dateParserWithoutArgument() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        return today;
    }

    function dateParser(date) {
        return date
            ? dateParserwithArgument(date)
            : dateParserWithoutArgument();
    }

    function FilterExpectedVehiclesToday() {
        const customerOrdersExpectedToday = customerOrderList.filter(
            (customerOrder) => {
                return (
                    customerOrder.Reception_Date === dateParser() &&
                    customerOrder.Checked_In === false
                );
            }
        );
        return customerOrdersExpectedToday;
    }

    const ExpectedVehiclesToday = FilterExpectedVehiclesToday();
    console.log("ExpectedVehiclesToday", ExpectedVehiclesToday);

    function FilterVehiclesCheckedInToday() {
        const customerOrdersExpectedToday = customerOrderList.filter(
            (customerOrder) => {
                return (
                    customerOrder.Reception_Date === dateParser() &&
                    customerOrder.Checked_In === true &&
                    customerOrder.Received_In === false
                );
            }
        );
        return customerOrdersExpectedToday;
    }
    const VehiclesCheckedInToday = FilterVehiclesCheckedInToday();

    function FilterVehiclesReceivedToday() {
        const customerOrdersExpectedToday = customerOrderList.filter(
            (customerOrder) => {
                return (
                    customerOrder.Reception_Date === dateParser() &&
                    customerOrder.Checked_In === true &&
                    customerOrder.Received_In === true
                );
            }
        );
        return customerOrdersExpectedToday;
    }
    const VehiclesReceivedInToday = FilterVehiclesReceivedToday();
    console.log("VehiclesReceivedInToday", VehiclesReceivedInToday);

    const checkIn = () => {
        setIsCheckInLoading(true);
        const formObject = {
            Checked_In: true,
            Checked_In_Date: dateParserWithoutArgument(),
            Checked_In_Time: new Date().toString().split(" ")[4],
            Checked_In_By: state.auth.user.email,
        };

        dispatch(updateCustomerOrder(selectedCustomerOrder.No, formObject));
        // dispatch(getCustomerOrder())

        if (
            dispatch(updateCustomerOrder(selectedCustomerOrder.No, formObject))
        ) {
            setIsCheckInLoading(false);
            setIsExpectedVehicleDialogOpen(false);
        }
    };

    const handleChangePage = useCallback(
        (_, page) => {
            setPage(page);
        },
        [setPage]
    );

    const handleDeleteTargetDialogClose = useCallback(() => {
        setIsDeleteTargetDialogOpen(false);
    }, [setIsDeleteTargetDialogOpen]);

    const handleDeleteTargetDialogOpen = useCallback(
        (row) => {
            setIsDeleteTargetDialogOpen(true);
            setDeleteTargetDialogRow(row);
        },
        [setIsDeleteTargetDialogOpen, setDeleteTargetDialogRow]
    );

    const handleExpectedVehicleDialogOpen = useCallback(
        (expectedVehicle) => {
            setIsExpectedVehicleDialogOpen(true);
            setSelectExpectedVehicleDialogRow(expectedVehicle);
        },
        [setIsExpectedVehicleDialogOpen, setSelectExpectedVehicleDialogRow]
    );

    const toggleTarget = useCallback(
        (row) => {
            const _targets = [...targets];
            const index = _targets.findIndex(
                (element) => element.id === row.id
            );
            row.isActivated = !row.isActivated;
            _targets[index] = row;
            if (row.isActivated) {
                pushMessageToSnackbar({
                    text: "The row is now activated",
                });
            } else {
                pushMessageToSnackbar({
                    text: "The row is now deactivated",
                });
            }
            setTargets(_targets);
            console.log("row::>", row);
            console.log("index::>", index);
        },
        [pushMessageToSnackbar, targets, setTargets]
    );

    // const selectRow = selectedCustomerOrder => {
    //   console.log('row:>', selectedCustomerOrder);
    //   setSelectedCustomerOrder(selectedCustomerOrder);
    //   console.log('selectedCustomerOrder', selectedCustomerOrder);
    //   setIsExpectedVehicleDialogOpen(true);
    // };

    const handleExpectedVehicleDialog = (event, selectedExpectedVehicle) => {
        console.log("selectedExpectedVehicle:>", selectedExpectedVehicle);
        setSelectedExpectedVehicle(selectedExpectedVehicle);
        setIsExpectedVehicleDialogOpen(true);
    };

    const itemHeight = 216;
    const options = ["Checked-In Vehicles", "Received Vehicles"];
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState("Checked-In Vehicles");

    const handleClick = useCallback(
        (event) => {
            console.log("event", event.currentTarget);

            setAnchorEl(event.currentTarget);
        },
        [setAnchorEl]
    );

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    let data = [];

    const selectOption = useCallback(
        (selectedOption) => {
            console.log("selectedOption", selectedOption);
            setSelectedOption(selectedOption);
            if (selectedOption === "Checked-In Vehicles") {
                setTargets(VehiclesCheckedInToday);
            }
            if (selectedOption === "Received Vehicles") {
                setTargets(VehiclesReceivedInToday);
            }
            handleClose();
        },
        [setSelectedOption, handleClose]
    );

    const isOpen = Boolean(anchorEl);

    console.log("data", data);

    return (
        <React.Fragment>
            {/* <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{ title }</Typography>
      </AccordionSummary> */}
            {/* ******* */}
            {/* <Dialog
        open={isExpectedVehicleDialogOpen}
        onClose={() => setIsExpectedVehicleDialogOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
        <div className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <TableBody>
            <TableRow selected>
              <TableCell variant="head" component="th" scope="row">
                <Typography variant="h6">
                  Appointment Details
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography variant="subtitle1">
                No.
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography variant="subtitle1">
                  {selectedCustomerOrder.No}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography variant="subtitle1">
                Vehicle Registration No.
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
              <Typography variant="subtitle1">
                {selectedCustomerOrder.Vehicle_Registration_No}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography variant="subtitle1">
                Model Name
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
              <Typography variant="subtitle1">
                {selectedCustomerOrder.Model_Name}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography variant="subtitle1">
                Customer Name
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
              <Typography variant="subtitle1">
                {selectedCustomerOrder.Customer_Name}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography variant="subtitle1">
                Appointment Date
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
              <Typography variant="subtitle1">
                {selectedCustomerOrder.Appointment_Date}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography variant="subtitle1">
                Customer Name
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
              <Typography variant="subtitle1">
                {selectedCustomerOrder.Appointment_Time}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
            
              <TableCell component="th" scope="row">
                <Typography variant="subtitle1">
                Service Type
                </Typography>
              </TableCell>
             
              <TableCell component="th" scope="row">
                <Typography variant="subtitle1">
                {selectedCustomerOrder.Service_Type}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Button
              color="primary"
              size="large"
              onClick={checkIn}
              variant="contained"
              disabled={isCheckInLoading}
              sx={{ width: "100%", maxWidth: "24rem", paddingY: "1rem", marginBottom: "1rem" }}
            >
              Check In {isCheckInLoading && <ButtonCircularProgress />}
            </Button>
      </DialogActions>
      </Dialog> */}
            {/* ****** */}
            <ConfirmationDialog
                open={isDeleteTargetDialogOpen}
                title="Confirmation"
                content={
                    deleteTargetDialogRow ? (
                        <span>
                            {"Do you really want to remove the friend "}
                            <b>{deleteTargetDialogRow.Customer_Name}</b>
                            {" from your list?"}
                        </span>
                    ) : null
                }
                onClose={handleDeleteTargetDialogClose}
                onConfirm={deleteTarget}
                loading={isDeleteTargetLoading}
            />
            {/* <ExpectedVehicleDialog 
        open={isExpectedVehicleDialogOpen}
        title="Expected Vehicle"
      /> */}
            <Card>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                    px={2}
                    py={2}
                    sx={{ backgroundColor: "#fff" }}
                >
                    <Typography
                        variant="h5"
                        className={classes.brandText}
                        display="inline"
                        color="primary"
                    >
                        {selectedOption}
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="More"
                            aria-owns={isOpen ? "long-menu" : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                            size="large"
                        >
                            <MoreVertIcon color="red" />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: itemHeight,
                                    width: 200,
                                },
                            }}
                            disableScrollLock
                        >
                            {options.map((option) => (
                                <MenuItem
                                    key={option}
                                    selected={option === selectedOption}
                                    onClick={() => {
                                        selectOption(option);
                                    }}
                                    name={option}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </Box>
            </Card>
            <Divider />
            <Box width="100%" sx={{ backgroundColor: "#fff" }}>
                {/* <Typography
        variant="h4"
        className={classes.brandText}
        display="inline"
        color="primary"
        px={2}
        my={5}
      >
        Expected Vehicles
      </Typography> */}

                <div className={classes.tableWrapper}>
                    {VehiclesCheckedInToday.length > 0 &&
                    selectedOption === "Checked-In Vehicles" ? (
                        <Table aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={VehiclesCheckedInToday.length}
                                rows={rows}
                            />
                            <TableBody>
                                {stableSort(
                                    VehiclesCheckedInToday,
                                    getSorting(order, orderBy)
                                )
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((selectedCustomerOrder, index) => (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={index}
                                            onClick={() => {
                                                selectRowCheckedIn(
                                                    selectedCustomerOrder
                                                );
                                            }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {
                                                    selectedCustomerOrder.Vehicle_Registration_No
                                                }
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {
                                                    selectedCustomerOrder.Model_Name
                                                }
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {
                                                    selectedCustomerOrder.Customer_Name
                                                }
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {
                                                    selectedCustomerOrder.Reception_Time
                                                }
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {selectedCustomerOrder.Stage ===
                                                "Pending" ? (
                                                    <ColorfulChip
                                                        label={`${selectedCustomerOrder.Stage}`}
                                                        color={
                                                            theme.palette
                                                                .secondary.main
                                                        }
                                                    />
                                                ) : (
                                                    <ColorfulChip
                                                        label={
                                                            selectedCustomerOrder.Stage
                                                        }
                                                        color={
                                                            theme.palette.error
                                                                .dark
                                                        }
                                                    />
                                                )}
                                                {/* {row.Stage} */}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {/* <Box
                                                    display="flex"
                                                    justifycontent="flex-end"
                                                >
                                                    {selectedCustomerOrder.isActivated ? (
                                                        <IconButton
                                                            className={
                                                                classes.iconButton
                                                            }
                                                            onClick={() => {
                                                                toggleTarget(
                                                                    selectedCustomerOrder
                                                                );
                                                            }}
                                                            aria-label="Pause"
                                                            size="large"
                                                        >
                                                            <PauseCircleOutlineIcon
                                                                className={
                                                                    classes.blackIcon
                                                                }
                                                            />
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton
                                                            className={
                                                                classes.iconButton
                                                            }
                                                            color="primary"
                                                            onClick={() => {
                                                                toggleTarget(
                                                                    selectedCustomerOrder
                                                                );
                                                            }}
                                                            aria-label="Resume"
                                                            size="large"
                                                        >
                                                            <PlayCirlceOutlineIcon />
                                                        </IconButton>
                                                    )}
                                                    <IconButton
                                                        className={
                                                            classes.iconButton
                                                        }
                                                        onClick={() => {
                                                            handleDeleteTargetDialogOpen(
                                                                selectedCustomerOrder
                                                            );
                                                        }}
                                                        aria-label="Delete"
                                                        size="large"
                                                    >
                                                        <DeleteIcon
                                                            className={
                                                                classes.blackIcon
                                                            }
                                                        />
                                                    </IconButton>
                                                </Box> */}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    ) : VehiclesReceivedInToday.length > 0 &&
                      selectedOption === "Received Vehicles" ? (
                        <Table aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={VehiclesReceivedInToday.length}
                                rows={rows}
                            />
                            <TableBody>
                                {stableSort(
                                    VehiclesReceivedInToday,
                                    getSorting(order, orderBy)
                                )
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((selectedCustomerOrder, index) => (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={index}
                                            // onClick={() => {
                                            //     selectRowReceivedIn(
                                            //         selectedCustomerOrder
                                            //     );
                                            // }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {
                                                    selectedCustomerOrder.Vehicle_Registration_No
                                                }
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {
                                                    selectedCustomerOrder.Model_Name
                                                }
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {
                                                    selectedCustomerOrder.Customer_Name
                                                }
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {
                                                    selectedCustomerOrder.Reception_Time
                                                }
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {selectedCustomerOrder.Stage ===
                                                "Pending" ? (
                                                    <ColorfulChip
                                                        label={`${selectedCustomerOrder.Stage}`}
                                                        color={
                                                            theme.palette
                                                                .secondary.main
                                                        }
                                                    />
                                                ) : (
                                                    <ColorfulChip
                                                        label={
                                                            selectedCustomerOrder.Stage
                                                        }
                                                        color={
                                                            theme.palette.error
                                                                .dark
                                                        }
                                                    />
                                                )}
                                                {/* {row.Stage} */}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {/* <Box display="flex" justifycontent="flex-end">
                        {selectedCustomerOrder.isActivated ? (
                          <IconButton
                            className={classes.iconButton}
                            onClick={() => {
                              toggleTarget(selectedCustomerOrder);
                            }}
                            aria-label="Pause"
                            size="large">
                            <PauseCircleOutlineIcon
                              className={classes.blackIcon}
                            />
                          </IconButton>
                        ) : (
                          <IconButton
                            className={classes.iconButton}
                            color="primary"
                            onClick={() => {
                              toggleTarget(selectedCustomerOrder);
                            }}
                            aria-label="Resume"
                            size="large">
                            <PlayCirlceOutlineIcon />
                          </IconButton>
                        )}
                        <IconButton
                          className={classes.iconButton}
                          onClick={() => {
                            handleDeleteTargetDialogOpen(selectedCustomerOrder);
                          }}
                          aria-label="Delete"
                          size="large">
                          <DeleteIcon className={classes.blackIcon} />
                        </IconButton>
                      </Box> */}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <Box m={2}>
                            <HighlightedInformation>
                                {emptyLineNotification}
                            </HighlightedInformation>
                        </Box>
                    )}
                </div>
                <div className={classes.alignRight}>
                    <TablePagination
                        component="div"
                        count={targets.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            "aria-label": "Previous Page",
                        }}
                        nextIconButtonProps={{
                            "aria-label": "Next Page",
                        }}
                        onPageChange={handleChangePage}
                        classes={{
                            select: classes.dNone,
                            selectIcon: classes.dNone,
                            actions:
                                targets.length > 0
                                    ? classes.dBlock
                                    : classes.dNone,
                            caption:
                                targets.length > 0
                                    ? classes.dBlock
                                    : classes.dNone,
                        }}
                        labelRowsPerPage=""
                    />
                </div>
            </Box>
        </React.Fragment>
    );
}

CustomDataTable.propTypes = {
    classes: PropTypes.object.isRequired,
    targets: PropTypes.arrayOf(PropTypes.object).isRequired,
    setTargets: PropTypes.func.isRequired,
    pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(CustomDataTable);
