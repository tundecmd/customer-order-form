import * as React from 'react';
// import './ReceiveVehicles.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from 'rc-checkbox';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { FormControlLabel } from "@mui/material";
// import { getCustomerOrder, getCustomerOrderById, updateCustomerOrder } from '../../actions';

// import MaterialTable from '@material-table/core';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Button, Card } from '@mui/material';
// import { CameraAltIcon } from '@material-ui/icons';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ClearIcon from '@mui/icons-material/Clear';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearAllIcon from '@mui/icons-material/ClearAll';
// import Button from '@mui/material/Button';

// import { IconButton } from '@mui/material';
// import IconButton from "@material-ui/core/IconButton";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// import CloseIcon from '@mui/icons-material/Close';
// import { IconButton } from '@mui/material';

import Webcam from "react-webcam";
// import { getPartsStockConfirmation } from '../../actions/partsStockConfirmation.action';
import { updateCustomerOrder } from 'actions';
import { getCustomerOrder } from 'actions';
import { getPartsStockConfirmation } from 'actions/partsStockConfirmation.action';
import SelfAligningImage from 'shared/components/SelfAligningImage';
import PartsStockConfirmationDataTable from './PartsStockConfirmationDataTable';

function TabPanel(props) {
  // console.log('props', props)
  // console.log(customerOrder)
  // console.log("jjjjjjjj")
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const deliveryTypeOptions = [
  { value: '1', label: 'Yes' },
  { value: '2', label: 'No' }
];

export default function BasicTabs(props) {
  console.log('props location :>> ', props.location);
  const { customerOrder, openOtherDetails1, setOpenOtherDetails1, receiveVehicleSubmitParentCallBack } = props;
  console.log('customerOrder :>> ', customerOrder);
  const dispatch = useDispatch();

  function MyComponentXs() {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.up('xs'));
    return matchesXs;
  }

  function MyComponentSm() {
    const matchesSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    return matchesSm;
  }

  function MyComponentMd() {
    const matchesMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
    return matchesMd;
  }

  console.log('MyComponent()', MyComponentSm())

  const videoConstraints = {
    width: MyComponentMd() ? 920 : 560,
    height: 400,
    facingMode: "user"
    // facingMode: {exact :"environment"}                                                                                                                                                                                                                                                                                                                   
  };

  const state = useSelector(state => state);
  const [modalImageLeft, setModalImageLeft] = React.useState(false);
  const [modalImageRight, setModalImageRight] = React.useState(false);
  const [modalImageFront, setModalImageFront] = React.useState(false);
  const [modalImageRear, setModalImageRear] = React.useState(false);
  const [modalImageTop, setModalImageTop] = React.useState(false);


  const [camShowFront, setCamShowFront] = React.useState(false);
  const [camShowRear, setCamShowRear] = React.useState(false);
  const [camShowRight, setCamShowRight] = React.useState(false);
  const [camShowLeft, setCamShowLeft] = React.useState(false);
  const [camShowTop, setCamShowTop] = React.useState(false);
  
  const [value, setValue] = React.useState(0);
  const [disabled, setDisabled] = React.useState(true);
  const [active, setActive] = React.useState(false);
  const [deliveryType, setDeliveryType] = React.useState(deliveryTypeOptions);

  const [dataReceivedVehicles, setDataReceivedVehicles] = React.useState([]);
  const [receivedVehicle, setReceivedVehicle] = React.useState({});
  // const [Additional_Job_Confirmation, setAdditional_Job_Confirmation] = React.useState(customerOrder.Additional_Job_Confirmation)


  const [Reception_Date, setReception_Date] = React.useState(customerOrder.Reception_Date);
  const [open, setOpen] = React.useState(false);
  const [Estimated_Job_Time, setEstimated_Job_Time] = React.useState(customerOrder.Estimated_Job_Time);
  const [Subtotal, setSubtotal] = React.useState(customerOrder.Subtotal);
  const [VAT_Amount, setVAT_Amount] = React.useState(customerOrder.VAT_Amount);
  const [Grand_Cost, setGrand_Cost] = React.useState(customerOrder.Grand_Cost);
  const [Customer_Signature, setCustomer_Signature] = React.useState(customerOrder.Estimated_Job_Time);

  const [Seat_Cover, setSeat_Cover] = React.useState(customerOrder.Seat_Cover);
  const [Floor_Mat, setFloor_Mat] = React.useState(customerOrder.Floor_Mat);
  const [Additional_Job_Confirmation, setAdditional_Job_Confirmation] = React.useState(customerOrder.Additional_Job_Confirmation);
  const [Replace_Parts_Keep, setReplace_Parts_Keep] = React.useState(customerOrder.Replace_Parts_Keep);
  const [Valuables, setValuables] = React.useState(customerOrder.Valuables);
  const [Present_Estimate_w_Explanation, setPresent_Estimate_w_Explanation] = React.useState(customerOrder.Present_Estimate_w_Explanation);
  const [Odometer_At_Appointment, setOdometer_At_Appointment] = React.useState(customerOrder.Odometer_At_Appointment);

 

  const handleCamShowFront = () => {
    setCamShowFront(true);
  }
  const handleCamShowRear = () => {
    setCamShowRear(true);
  }

  const handleCamShowRight = () => {
    setCamShowRight(true);
  }

  const handleCamShowLeft = () => {
    setCamShowLeft(true);
  }

  const handleCamShowTop = () => {
    setCamShowTop(true);
  }

  const webcamRefFront = React.useRef(null);
  const webcamRefRear = React.useRef(null);
  const webcamRefRight = React.useRef(null);
  const webcamRefLeft = React.useRef(null);
  const webcamRefTop = React.useRef(null);

  const [openModalFrontImg, setOpenModalFrontImg] = React.useState(false);
  const [openModalRearImg, setOpenModalRearImg] = React.useState(false);
  const [openModalRightImg, setOpenModalRightImg] = React.useState(false);
  const [openModalLeftImg, setOpenModalLeftImg] = React.useState(false);
  const [openModalTopImg, setOpenModalTopImg] = React.useState(false);

  const [imgSrcFront, setImgSrcFront] = React.useState(null);
  const [imgSrcRear, setImgSrcRear] = React.useState(null);
  const [imgSrcRight, setImgSrcRight] = React.useState(null);
  const [imgSrcLeft, setImgSrcLeft] = React.useState(null);
  const [imgSrcTop, setImgSrcTop] = React.useState(null);

  const captureFront = React.useCallback((e) => {
    e.preventDefault();
    const imageSrc = webcamRefFront.current.getScreenshot({width: 50, height: 50});
    setImgSrcFront(imageSrc);
  }, [webcamRefFront, setImgSrcFront]);

  const captureRear = React.useCallback((e) => {
    e.preventDefault();
    const imageSrc = webcamRefRear.current.getScreenshot({width: 50, height: 50});
    setImgSrcRear(imageSrc);
  }, [webcamRefRear, setImgSrcRear]);

  const captureRight = React.useCallback((e) => {
    e.preventDefault();
    const imageSrc = webcamRefRight.current.getScreenshot({width: 50, height: 50});
    setImgSrcRight(imageSrc);
  }, [webcamRefRight, setImgSrcRight]);

  const captureLeft = React.useCallback((e) => {
    e.preventDefault();
    const imageSrc = webcamRefLeft.current.getScreenshot({width: 50, height: 50});
    setImgSrcLeft(imageSrc);
  }, [webcamRefLeft, setImgSrcLeft]);

  const captureTop = React.useCallback((e) => {
    e.preventDefault();
    const imageSrc = webcamRefTop.current.getScreenshot({width: 50, height: 50});
    setImgSrcTop(imageSrc);
  }, [webcamRefTop, setImgSrcTop]);

  const clearFrontImg = (e) => {
    e.preventDefault();
    setImgSrcFront(null);
  };
  const clearRearImg = (e) => {
    e.preventDefault();
    setImgSrcRear(null);
  };
  const clearRightImg = (e) => {
    e.preventDefault();
    setImgSrcRight(null);
  };
  const clearLeftImg = (e) => {
    e.preventDefault();
    setImgSrcLeft(null);
  };
  const clearTopImg = (e) => {
    e.preventDefault();
    setImgSrcTop(null);
  };

  const stopCaptureFront = React.useCallback((e) => {
    e.preventDefault();
    setCamShowFront(false);
  }, []);

  const stopCaptureRear = React.useCallback((e) => {
    e.preventDefault();
    setCamShowRear(false);
  }, []);

  const stopCaptureRight = React.useCallback((e) => {
    e.preventDefault();
    setCamShowRight(false);
  }, []);

  const stopCaptureLeft = React.useCallback((e) => {
    e.preventDefault();
    setCamShowLeft(false);
  }, []);
  const stopCaptureTop = React.useCallback((e) => {
    e.preventDefault();
    setCamShowTop(false);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // function refreshPage() {
  //   window.location.reload(false);
  // }

  const handleCancel = (event, newValue) => {
    setOpenOtherDetails1(false);
    customerOrder['Received_In'] = false;
    const formObject = {
      Received_In: false
    };
    dispatch(updateCustomerOrder(customerOrder.No, formObject)); 
    dispatch(getCustomerOrder());
    // refreshPage(false)
    
  
    if (dispatch(updateCustomerOrder(customerOrder.No, formObject))) {
      setOpenOtherDetails1(false)
    }
  };
  const handleContinue = (event, newValue) => {
    setValue(1);
    setDisabled(!disabled);
    setActive(!active);
  };
  const handlePrevious = (event, newValue) => {
    setValue(0);
    setDisabled(!disabled);
    setActive(!active);
  };
  // let [receiveVehicleSubmit, setReceiveVehicleSubmit] = React.useState(receiveVehicleSubmitTrigger);

  const onReceiveVehicleTrigger = () => {
    const formObject = {
      Additional_Job_Confirmation
    };
    receiveVehicleSubmitParentCallBack(formObject);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formObject = {
      Odometer_At_Appointment,
      Seat_Cover,
      Floor_Mat,
      Valuables,
      Additional_Job_Confirmation,
      Present_Estimate_w_Explanation,
      Replace_Parts_Keep
    };
    dispatch(updateCustomerOrder(customerOrder.No, formObject));
  };

  const [form, setForm] = React.useState({
    
  });

  const onUpdateField = e => {
    const field = e.target.name;
    const nextFormState = {
        ...form,
        [field]: e.target.value,
    };
    setForm(nextFormState);
    console.log('form', form)
  };

    const onSubmitForm = e => {
        e.preventDefault();
        // const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        // if (!isValid) return;
        console.log('form', form)
        dispatch(updateCustomerOrder(form.No, form));
        // alert(JSON.stringify(form, null, 2));
    };

  React.useEffect(() => {
    dispatch(getPartsStockConfirmation())
  }, [])

  const [partsStockList, setpartsStockList] = React.useState(state.partsStock.partsStockList);

  console.log('partsStockList', partsStockList)


  const columnsPartsStockConfirmation = [
    // {
    //   title: 'ID',
    //   field: 'id',
    //   width: "5%"
    // },
    {
      title: 'Item',
      field: 'Description'
    },
    {
      title: 'QTY',
      field: 'Quantity_Requested'
    },
    {
      title: 'In-Stock',
      field: 'In_Stock'
    },
    {
        title: 'Reception Date',
        field: 'Reception_Date',
        type: "datetime",
        render: (data) => {
          // console.log(data);
          return new Date('2019-02-19T06:00:00Z').toLocaleTimeString('en-gb');
        }
    },
    {
        title: 'Cost',
        field: 'stage',
        cellStyle: {       
          color: "green"
        },
      },
    
  ];

  // const getCODT = () => {
  //     fetch(CODTUrl)
  //       .then(res => res.json())
  //       .then(res => { 
  //         console.log(res.status)
  //         setDataReceivedVehicles(res);
  //       })
  //       .catch(e => console.log(e))
  //   }
  
    // React.useEffect(() => {
    //   getCODT();
    // }, [])

    const handleAdditional_Job_ConfirmationYes = () => {
      setAdditional_Job_Confirmation(true);
    };
    const handleAdditional_Job_ConfirmationNo = () => {
      setAdditional_Job_Confirmation(false);
    };

    
  return (
    <>
      <div className="modal-header">
        <span className="d-flex justify-content-start"></span>
          <span className="d-flex justify-content-end close-icon-white-color">
            <IconButton
                key="cancel"
                aria-label="Cancel"
                color="inherit"
                onClick={() => setOpenOtherDetails1(false)}
              >
                <CloseIcon color="error" />
              </IconButton>
        </span>
      </div>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Other Details" disabled={active} {...a11yProps(0)} className="mr-3" />
          <Tab label=" Parts/Job Details" disabled={disabled} {...a11yProps(1)} className="ml-3" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      {/* <div className="form-group row"> */}
        
        {/* <label className="col-md-5 col-form-label text-danger">Walk-around Confirmation</label> */}

      {/* ***************** */}

      <Grid container spacing={1}>
        
                            <Grid item xs={6} sm={6} md={12} sx={{ backGroundColor: "red !important" }}>
                              
                                {
                                    camShowRight ? 
                                    <>
                                      
                                    </>
                                    : 
                                      <>
                                      {(!imgSrcRight && !(camShowFront || camShowRight || camShowLeft || camShowRear)) &&
                                      <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        onClick={() => handleCamShowRight(camShowRight)}
                                      >
                                        <Typography color="error">R</Typography>
                                        <CameraAltIcon color="error" />
                                      </IconButton>   }
                                    </>                                  
                                  }   

                                  {
                                    camShowLeft ? 
                                    <>
                                      
                                    </>
                                    : 
                                      <>
                                      {(!imgSrcLeft && !(camShowFront || camShowRight || camShowTop || camShowRear)) &&
                                      <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        onClick={() => handleCamShowLeft(camShowLeft)}
                                      >
                                        <Typography color="error">L</Typography>
                                        <CameraAltIcon color="error" />
                                      </IconButton>   }
                                    </>                                  
                                  }  

                                  {
                                    camShowFront ? 
                                    <>
                                      
                                    </>
                                    : 
                                      <>
                                      {(!imgSrcFront && !(camShowRight || camShowRight || camShowLeft || camShowRear)) &&
                                      <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        onClick={() => handleCamShowFront(camShowFront)}
                                      >
                                        <Typography color="error">F</Typography>
                                        <CameraAltIcon color="error" />
                                      </IconButton>   }
                                    </>                                  
                                  }  

                                  {
                                    camShowRear ? 
                                    <>
                                      
                                    </>
                                    : 
                                      <>
                                      {(!imgSrcRear && !(camShowRight || camShowFront || camShowLeft || camShowTop)) &&
                                      <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        onClick={() => handleCamShowRear(camShowRear)}
                                      >
                                        <Typography color="error">B</Typography>
                                        <CameraAltIcon color="error" />
                                      </IconButton>   }
                                    </>                                  
                                  }  

{
                                    camShowTop ? 
                                    <>
                                      
                                    </>
                                    : 
                                      <>
                                      {(!imgSrcTop && !(camShowRight || camShowFront || camShowLeft || camShowRear)) &&
                                      <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        onClick={() => handleCamShowTop(camShowTop)}
                                      >
                                        <Typography color="error">T</Typography>
                                        <CameraAltIcon color="error" />
                                      </IconButton>   }
                                    </>                                  
                                  }  
                                    
                                <Grid container>
                                  <Grid item xs={4}>
                                    {
                                      imgSrcRight 
                                      &&  
                                      <Grid container>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Box onClick={() => setModalImageRight(!modalImageRight)}>
                                            {
                                              imgSrcRight && (
                                              <Box onClick={() => setOpenModalRightImg(!openModalRightImg)}>
                                                <img src={imgSrcRight} alt="screen shot" />
                                              </Box>
                                              )
                                            }
                                          </Box>
                                        </Grid>
                                        <Grid container>
                                          <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                            <Typography color="error">R</Typography>
                                          </Grid>
                                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                              <ClearAllIcon color='error' onClick={(e) => clearRightImg(e)} />
                                            </Grid>
                                            {/* <Button size='small' onClick={(e) => clearRightImg(e)} variant='outlined'>Clear</Button> */}
                                          </Grid>
                                        </Grid>
                                    }
                                  </Grid>

                                  <Grid item xs={4}>
                                    {
                                      imgSrcLeft 
                                      &&  
                                      <Grid container>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Box onClick={() => setModalImageLeft(!modalImageLeft)}>
                                            {
                                              imgSrcLeft && (
                                              <Box onClick={() => setOpenModalLeftImg(!openModalLeftImg)}>
                                                <img src={imgSrcLeft} alt="screen shot" />
                                              </Box>
                                              )
                                            }
                                          </Box>
                                        </Grid>
                                        <Grid container>
                                          <Grid item xs={2} sm={2} md={2}  lg={2} xl={2}>
                                            <Typography color="error">L</Typography>
                                          </Grid>
                                            <Grid item xs={2} sm={2} md={2}  lg={2} xl={2}>
                                              <ClearAllIcon color='error' onClick={(e) => clearLeftImg(e)} />
                                            </Grid>
                                            {/* <Button size='small' onClick={(e) => clearRightImg(e)} variant='outlined'>Clear</Button> */}
                                          </Grid>
                                        </Grid>
                                    }
                                  </Grid>

                                  <Grid item xs={4}>
                                    {
                                      imgSrcFront 
                                      &&  
                                      <Grid container>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Box onClick={() => setModalImageFront(!modalImageFront)}>
                                            {
                                              imgSrcFront && (
                                              <Box onClick={() => setOpenModalFrontImg(!openModalFrontImg)}>
                                                <img src={imgSrcFront} alt="screen shot" />
                                              </Box>
                                              )
                                            }
                                          </Box>
                                        </Grid>
                                        <Grid container>
                                          <Grid item xs={2} sm={2} md={2}  lg={2} xl={2}>
                                            <Typography color="error">F</Typography>
                                          </Grid>
                                            <Grid item xs={2} sm={2} md={2}  lg={2} xl={2}>
                                              <ClearAllIcon color='error' onClick={(e) => clearFrontImg(e)} />
                                            </Grid>
                                            {/* <Button size='small' onClick={(e) => clearRightImg(e)} variant='outlined'>Clear</Button> */}
                                          </Grid>
                                        </Grid>
                                    }
                                  </Grid>


                                  <Grid item xs={4}>
                                    {
                                      imgSrcRear 
                                      &&  
                                      <Grid container>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Box onClick={() => setModalImageRear(!modalImageRear)}>
                                            {
                                              imgSrcRear && (
                                              <Box onClick={() => setOpenModalRearImg(!openModalRearImg)}>
                                                <img src={imgSrcRear} alt="screen shot" />
                                              </Box>
                                              )
                                            }
                                          </Box>
                                        </Grid>
                                        <Grid container>
                                          <Grid item xs={2} sm={2} md={2}  lg={2} xl={2}>
                                            <Typography color="error">B</Typography>
                                          </Grid>
                                            <Grid item xs={2} sm={2} md={2}  lg={2} xl={2}>
                                              <ClearAllIcon color='error' onClick={(e) => clearRearImg(e)} />
                                            </Grid>
                                            {/* <Button size='small' onClick={(e) => clearRightImg(e)} variant='outlined'>Clear</Button> */}
                                          </Grid>
                                        </Grid>
                                    }
                                  </Grid>


                                  <Grid item xs={4}>
                                    {
                                      imgSrcTop
                                      &&  
                                      <Grid container >
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Box onClick={() => setModalImageTop(!modalImageTop)}>
                                            {
                                              imgSrcTop && (
                                              <Box onClick={() => setOpenModalTopImg(!openModalTopImg)}>
                                                <img src={imgSrcTop} alt="screen shot" />
                                              </Box>
                                              )
                                            }
                                          </Box>
                                        </Grid>
                                        <Grid container>
                                          <Grid item xs={2} sm={2} md={2}  lg={2} xl={2}>
                                            <Typography color="error">T</Typography>
                                          </Grid>
                                            <Grid item xs={2} sm={2} md={2}  lg={2} xl={2}>
                                              <ClearAllIcon color='error' onClick={(e) => clearTopImg(e)} />
                                            </Grid>
                                            {/* <Button size='small' onClick={(e) => clearRightImg(e)} variant='outlined'>Clear</Button> */}
                                          </Grid>
                                        </Grid>
                                    }
                                  </Grid>

                                  
                                  

                                   

                                  </Grid>
                                    
                                  
                                  </Grid>

                                  {/* Right Dialog starts here */}
                                    {
                                      <Dialog
                                        fullWidth={true}
                                        // fullScreen
                                        maxWidth="lg"
                                        open={openModalRightImg}
                                        onClose={() => setOpenModalRightImg(!openModalRightImg)}
                                        aria-labelledby="responsive-dialog-title"
                                      >
                                        <DialogContent>
                                        
                                        {/* <FullWidthTabs /> */}
                                        <span onClick={() => setModalImageRight(!modalImageRight)}>
                                            {imgSrcRight && (
                                            <Box  className="img-lg" onClick={() => setOpenModalRightImg(!openModalRightImg)}>
                                              <img src={imgSrcRight} alt="screen shot" />
                                            </Box>
                                            )}
                                          </span>
                                        </DialogContent>
                                      </Dialog>
                                    }

                              {/* Right Dialog ends here */}

                                 {/* left Dialog starts here */}
                                 {
                                <Dialog
                                  fullWidth={true}
                                  // fullScreen
                                  maxWidth="lg"
                                  open={openModalLeftImg}
                                  onClose={() => setOpenModalLeftImg(!openModalLeftImg)}
                                  aria-labelledby="responsive-dialog-title"
                                >
                                  <DialogContent>
                                  
                                  {/* <FullWidthTabs /> */}
                                  <span onClick={() => setModalImageLeft(!modalImageLeft)}>
                                      {imgSrcLeft && (
                                       <Box  className="img-lg" onClick={() => setOpenModalLeftImg(!openModalLeftImg)}>
                                        <img src={imgSrcLeft} alt="screen shot" />
                                       </Box>
                                      )}
                                    </span>
                                  </DialogContent>
                                </Dialog>
                              }

                              {/* left Dialog ends here */}

                              {/* front Dialog starts here */}
                              {
                                <Dialog
                                  fullWidth={true}
                                  // fullScreen
                                  maxWidth="lg"
                                  open={openModalFrontImg}
                                  onClose={() => setOpenModalFrontImg(!openModalFrontImg)}
                                  aria-labelledby="responsive-dialog-title"
                                >
                                  <DialogContent>
                                  
                                  {/* <FullWidthTabs /> */}
                                  <span onClick={() => setModalImageFront(!modalImageFront)}>
                                      {imgSrcFront && (
                                       <Box  className="img-lg" onClick={() => setOpenModalFrontImg(!openModalFrontImg)}>
                                        <img src={imgSrcFront} alt="screen shot" />
                                       </Box>
                                      )}
                                    </span>
                                  </DialogContent>
                                </Dialog>
                              }

                              {/* front Dialog ends here */}

                              {/* rear Dialog starts here */}
                              {
                                <Dialog
                                  fullWidth={true}
                                  // fullScreen
                                  maxWidth="lg"
                                  open={openModalRearImg}
                                  onClose={() => setOpenModalRearImg(!openModalRearImg)}
                                  aria-labelledby="responsive-dialog-title"
                                >
                                  <DialogContent>
                                  
                                  {/* <FullWidthTabs /> */}
                                  <span onClick={() => setModalImageRear(!modalImageRear)}>
                                      {imgSrcRear && (
                                       <Box  className="img-lg" onClick={() => setOpenModalRearImg(!openModalRearImg)}>
                                        <img src={imgSrcRear} alt="screen shot" />
                                       </Box>
                                      )}
                                    </span>
                                  </DialogContent>
                                </Dialog>
                              }

                              {/* rear Dialog ends here */}

                              {/* top Dialog starts here */}
                              {
                                <Dialog
                                  fullWidth={true}
                                  // fullScreen
                                  maxWidth="lg"
                                  open={openModalTopImg}
                                  onClose={() => setOpenModalTopImg(!openModalTopImg)}
                                  aria-labelledby="responsive-dialog-title"
                                >
                                  <DialogContent>
                                  
                                  {/* <FullWidthTabs /> */}
                                  <span onClick={() => setModalImageTop(!modalImageTop)}>
                                      {imgSrcTop && (
                                       <Box  className="img-lg" onClick={() => setOpenModalTopImg(!openModalTopImg)}>
                                        <img src={imgSrcTop} alt="screen shot" />
                                       </Box>
                                      )}
                                    </span>
                                  </DialogContent>
                                </Dialog>
                              }

                              {/* top Dialog ends here */}
                              
                            
                           
                            {/* Right Webcam starts here */}

                            {
                                    camShowRight && 
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Webcam
                                            audio={false}
                                            // height={400}
                                            ref={webcamRefRight}
                                            screenshotFormat="image/jpeg"
                                            screenshotQuality= {1}
                                            // width={300}
                                            videoConstraints={videoConstraints}
                                          />
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                          <Button size='small' onClick={(e) => captureRight(e)} variant='outlined'>Capture</Button>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                          <Button size='small' onClick={(e) => stopCaptureRight(e)} variant='outlined'>Stop Capturing</Button>
                                        </Grid>
                                      </Grid>
                            }

                            {/* Right webcam ends here */}

                            {/* Left webcam stats here */}
                            {
                              camShowLeft && 
                              <Grid container>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Webcam
                                            audio={false}
                                            // height={400}
                                            ref={webcamRefLeft}
                                            screenshotFormat="image/jpeg"
                                            screenshotQuality= {1}
                                            // width={300}
                                            videoConstraints={videoConstraints}
                                          />
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                          <Button size='small' onClick={(e) => captureLeft(e)} variant='outlined'>Capture</Button>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                          <Button size='small' onClick={(e) => stopCaptureLeft(e)} variant='outlined'>Stop Capturing</Button>
                                        </Grid>
                                      </Grid>
                            }

                              {/* left webcam ends here */}

                            {/* front webcam starts here */}
                            {
                              camShowFront && 
                              <Grid container>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Webcam
                                            audio={false}
                                            // height={400}
                                            ref={webcamRefFront}
                                            screenshotFormat="image/jpeg"
                                            screenshotQuality= {1}
                                            // width={300}
                                            videoConstraints={videoConstraints}
                                          />
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                          <Button size='small' onClick={(e) => captureFront(e)} variant='outlined'>Capture</Button>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                          <Button size='small' onClick={(e) => stopCaptureFront(e)} variant='outlined'>Stop Capturing</Button>
                                        </Grid>
                                      </Grid>
                            }

                              {/* front webcam ends here */}

                              {/* rear webcam starts here */}
                                  {
                                            camShowRear && 
                                            <Grid container>
                                              <Grid item xs={12} sm={12} md={12}>
                                                <Webcam
                                                  audio={false}
                                                  // height={400}
                                                  ref={webcamRefRear}
                                                  screenshotFormat="image/jpeg"
                                                  screenshotQuality= {1}
                                                  // width={300}
                                                  videoConstraints={videoConstraints}
                                                />
                                              </Grid>
                                              <Grid item xs={6} sm={6} md={6}>
                                                <Button size='small' onClick={(e) => captureRear(e)} variant='outlined'>Capture</Button>
                                              </Grid>
                                              <Grid item xs={6} sm={6} md={6}>
                                                <Button size='small' onClick={(e) => stopCaptureRear(e)} variant='outlined'>Stop Capturing</Button>
                                              </Grid>
                                            </Grid>
                                  }

                              {/* rear webcam ends here */}

                              {/* top webcam starts here */}
                              {
                                            camShowTop && 
                                            <Grid container>
                                              <Grid item xs={12} sm={12} md={12}>
                                                <Webcam
                                                  audio={false}
                                                  // height={400}
                                                  ref={webcamRefTop}
                                                  screenshotFormat="image/jpeg"
                                                  screenshotQuality= {1}
                                                  // width={300}
                                                  videoConstraints={videoConstraints}
                                                />
                                              </Grid>
                                              <Grid item xs={6} sm={6} md={6}>
                                                <Button size='small' onClick={(e) => captureTop(e)} variant='outlined'>Capture</Button>
                                              </Grid>
                                              <Grid item xs={6} sm={6} md={6}>
                                                <Button size='small' onClick={(e) => stopCaptureTop(e)} variant='outlined'>Stop Capturing</Button>
                                              </Grid>
                                            </Grid>
                                  }

                              {/* top webcam ends here */}
                          
      </Grid>
                        <hr />
                        <form className='form' onSubmit={handleSubmit}>
                            {/* <div className="formGroupCheckbox">
                                <label htmlFor="label" className="formLabel">Additional Job Confirmation</label>
                                <Checkbox
                                    checked={Additional_Job_Confirmation}
                                    onChange={(e) => setAdditional_Job_Confirmation(e.target.checked)}
                                    name="isServiceHistory"
                                    label="ServiceHistory"
                                />
                            </div>
                            <div className="formGroupCheckbox">
                                <label htmlFor="label" className="formLabel">Valuables</label>
                                <Checkbox
                                    checked={Valuables}
                                    onChange={(e) => setValuables(e.target.checked)}
                                    name="isServiceHistory"
                                    label="ServiceHistory"
                                />
                            </div>
                            <div className="formGroupCheckbox">
                                <label htmlFor="label" className="formLabel">Present_Estimate_w_Explanation</label>
                                <Checkbox
                                    checked={Present_Estimate_w_Explanation}
                                    onChange={(e) => setPresent_Estimate_w_Explanation(e.target.checked)}
                                    name="isServiceHistory"
                                    label="ServiceHistory"
                                />
                            </div>
                            <div className="formGroupCheckbox">
                                <label htmlFor="label" className="formLabel">Replace Parts Keep</label>
                                <Checkbox
                                    checked={Replace_Parts_Keep}
                                    onChange={(e) => setReplace_Parts_Keep(e.target.checked)}
                                    name="isServiceHistory"
                                    label="ServiceHistory"
                                />
                            </div>
                            <div className="formGroupCheckbox">
                                <label htmlFor="label" className="formLabel">Seat Cover</label>
                                <Checkbox
                                    checked={Seat_Cover}
                                    onChange={(e) => setSeat_Cover(e.target.checked)}
                                    name="isServiceHistory"
                                    label="ServiceHistory"
                                />
                            </div> */}
                            <FormControlLabel
                              control={<Checkbox color="primary" />}
                              label={<Typography variant="body1">Additional Job Confirmation</Typography>}
                            />
                            
                            <FormControlLabel
                              control={<Checkbox color="primary" />}
                              label={<Typography variant="body1">Replace Parts Keep</Typography>}
                            />
                            <FormControlLabel
                              control={<Checkbox color="primary" />}
                              label={<Typography variant="body1">Present Estimate With Explanation</Typography>}
                            />
                            <FormControlLabel
                              control={<Checkbox color="primary" />}
                              label={<Typography variant="body1">Valuables</Typography>}
                            />
                            <FormControlLabel
                              control={<Checkbox color="primary" />}
                              label={<Typography variant="body1">Floor Mat</Typography>}
                            />
                            {/* <div className="formGroupCheckbox">
                                <label htmlFor="label" className="formLabel">Floor Mat</label>
                                <Checkbox
                                    checked={Floor_Mat}
                                    onChange={(e) => setFloor_Mat(e.target.checked)}
                                    name="isServiceHistory"
                                    label="ServiceHistory"
                                />
                            </div> */}
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Odometer_At_Appointment</label>
                                <input type="text" name="Odometer_At_Appointment" value={Odometer_At_Appointment} onChange={e => setOdometer_At_Appointment(e.target.value)} className='formField' />
                            </div>
                        </form>
      
      <Box display="flex" justifyContent="space-between">
      
        {
          customerOrder.Received_In === false 
          ? <>
            <Button
            color="primary"
            size="medium"
            onClick={handleCancel}
            variant="contained"
            // disabled={isCheckInLoading}
            sx={{ width: "100%", maxWidth: "24rem", paddingY: "1rem", marginBottom: "1rem", marginRight: "1px" }}
          >
            Cancel
          </Button>
            {/* <button 
              onClick={handleCancel} 
              className='btn btn-danger text-white mx-auto px-5 my-5'
            >
              Cancel
            </button> */}
            </>
          : 
            null
        }
        
        <Button
            color={`${customerOrder.Received_In !== true ? 'primary' : 'success'}`}
            size="medium"
            onClick={handleContinue}
            variant="outlined"
            // disabled={isCheckInLoading}
            sx={{ width: "100%", maxWidth: "24rem", paddingY: "1rem", marginBottom: "1rem", marginLeft: "1px" }}
          >
            Continue
          </Button>
        {/* <button 
          onClick={handleContinue} 
          className={`btn btn-${customerOrder.Received_In !== true ? 'danger' : 'success'} text-white mx-auto px-5 my-5`}
        >
          Continue
        </button> */}
      </Box>
      
      
      </TabPanel>

      <TabPanel value={value} index={1}>
      <div className="card-body">
                                {/* table here */}
                                <PartsStockConfirmationDataTable
                                  // pushMessageToSnackbar={pushMessageToSnackbar}
                                  // targets={data}
                                  targets={partsStockList}
                                  title="Parts Stock Confirmation"
                                  // setTargets={setTargets}
                                  emptyLineNotification="No Vehicle(s) is/are expected today"
                                />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Total</label>
                                <input type="text" name="Customer_Name" value={form.Total} onChange={onUpdateField} className='formField' />
                            </div>
                          
                          {/* <h4>Job Details</h4>
                          <div className="alert alert-dark">
                            <strong>Description </strong>
                            <div className="close">
                              <span aria-hidden="true">&times;</span>
                            </div>
                          </div> */}
                          {/* <div className="alert">
                            <strong>PM 45000KM </strong> ... REPLACE ENGINE OIL, OIL FILTER 
                          </div>
                          <div className="alert">
                            <strong>PM 45000KM </strong> ... REPLACE ENGINE OIL, OIL FILTER 
                          </div> */}
                          {/* <div className="form-group row">
                              <div className="col-md-5"></div>
                              <label className="col-md-3 col-form-label text-danger">Estimated Time </label>
                              <div className="col-md-3">
                                  <input type="text" value={Estimated_Job_Time} className="form-control" />
                              </div>
                          </div> */}
                          <Card>
                            <Box width="100%" px={2} py={2} sx={{ backgroundColor: "#fff" }}>
                            <Typography
                                variant="h5"
                                // className={classes.brandText}
                                display="inline"
                                color="primary"
                            >
                                Job Details
                            </Typography>
                            </Box>
                        </Card>
                          <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Estimated Job Time</label>
                                <input type="text" name="Customer_Name" value={form.Estimated_Job_Time} onChange={onUpdateField} className='formField' />
                          </div>
                          {/* <div className="form-group row">
                              <div className="col-md-5"></div>
                              <label className="col-md-3 col-form-label text-danger">Subtotal </label>
                              <div className="col-md-3">
                                  <input type="text" className="form-control" />
                              </div>
                          </div> */}
                          <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Subtotal</label>
                                <input type="text" name="Customer_Name" value={form.Subtotal} onChange={onUpdateField} className='formField' />
                          </div>
                          {/* <div className="form-group row">
                              <div className="col-md-5"></div>
                              <label className="col-md-3 col-form-label text-danger">VAT @ 2% </label>
                              <div className="col-md-3">
                                  <input type="text" className="form-control" />   VAT_Amount
                              </div>
                          </div> */}
                          <div className="formGroup">
                                <label htmlFor="label" className="formLabel">VAT @ 2%</label>
                                <input type="text" name="Customer_Name" value={form.VAT_Amount} onChange={onUpdateField} className='formField' />
                          </div>
                          {/* <div className="form-group row">
                              <div className="col-md-5"></div>
                              <label className="col-md-3 col-form-label text-danger">Grand Cost </label>
                              <div className="col-md-3">
                                  <input type="text" className="form-control" />
                              </div>
                          </div> */}
                          <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Grand Cost</label>
                                <input type="text" name="Customer_Name" value={form.Grand_Cost} onChange={onUpdateField} className='formField' />
                          </div>
                          {/* <div className="form-group row">
                              <label className="col-md-5 col-form-label">I have received an explanation of and agreed to the items listed above and accepted these terms and conditions. </label>
                              <div className="col-md-7">
                                  <textarea type="text" rows="4" className="form-control" placeholder='Customer Signature'></textarea>
                              </div>
                          </div> */}
                          <div className="formGroup">
                                <label htmlFor="label" className="formLabel">I have received an explanation of and agreed to the items listed above and accepted these terms and conditions. </label>
                                <textarea rows={4} name="Address" type="text" className='formField'></textarea>
                            </div>
                          <Box display="flex" justifyContent="space-between">
      
      {
        customerOrder.Received_In === false 
        ? <>
          <Button
          color="primary"
          size="medium"
          onClick={handlePrevious}
          variant="outlined"
          // disabled={isCheckInLoading}
          sx={{ width: "80%", maxWidth: "24rem", paddingY: "1rem", marginBottom: "1rem", marginRight: "1px" }}
        >
          Previous
        </Button>
          {/* <button 
            onClick={handleCancel} 
            className='btn btn-danger text-white mx-auto px-5 my-5'
          >
            Cancel
          </button> */}
          </>
        : 
          null
      }
      {
        customerOrder.Received_In === false
        ?
      <Button
          color={`${customerOrder.Received_In !== true ? 'primary' : 'success'}`}
          size="medium"
          onClick={onReceiveVehicleTrigger}
          variant="contained"
          // disabled={isCheckInLoading}
          sx={{ width: "80%", maxWidth: "24rem", paddingY: "1rem", marginBottom: "1rem", marginLeft: "1px" }}
        >
          Submit
        </Button>

      : 
        null
}
      {/* <button 
        onClick={handleContinue} 
        className={`btn btn-${customerOrder.Received_In !== true ? 'danger' : 'success'} text-white mx-auto px-5 my-5`}
      >
        Continue
      </button> */}
    </Box>
                          {/* <div className="d-flex">
                            <button onClick={handlePrevious} className={`btn btn-${customerOrder.Received_In === false ? 'danger' : 'success'} text-white mx-auto px-5 my-5`}>Previous</button>
                            {
                              customerOrder.Received_In === false 
                              ? 
                                <button onClick={onReceiveVehicleTrigger} className='btn btn-danger text-white mx-auto px-5 my-5'>Submit</button>
                              :
                                null
                            }
                            
                          </div> */}
      </TabPanel>

      {/* <div className="d-flex">
        <button onClick={handlePrevious} className='btn btn-danger text-white'>Previous</button>
        <button onClick={handleContinue} className='btn by btn-danger text-white'>Continue</button>
      </div> */}
    </Box>
    </>
  );
}
