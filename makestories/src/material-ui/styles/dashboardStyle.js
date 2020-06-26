import {
  successColor,
  whiteColor,
  grayColor,
  primaryColor,
  hexToRgb,
} from "./material-dashboard-react";

const dashboardStyle = {
  profile: {
    width: "100%",
    alignItems: "flex-start",
    paddingBottom: "10px",
    marginTop: "40px",
  },
  stylesForButton: {
    width: "30%",
    borderRadius: "5",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  successText: {
    color: successColor[0],
  },
  headSection: {},
  imageContainer: {
    // borderRight: "3px solid grey",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    overflow: "hidden",
    // display: "flex",
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px",
  },
  stats: {
    color: grayColor[0],
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitle: {
    color: primaryColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "bold",
    fontSize: "x-large",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "10px",
    textDecoration: "none",
    textTransform: "capitalize",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "5px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  noteToUser: {
    fontWeight: "700",
    paddingTop: "20px",
    paddingLeft: "15px",
    fontSize: "14px",
  },
};

export default dashboardStyle;