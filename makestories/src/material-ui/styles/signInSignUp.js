const signInSignUp = (theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alignLink: {
    textAlign: "center",
  },
  imageContainer: {
    width: "100px",
    height: "100px",
    marginLeft: "10px",
    borderRadius: "50%",
  },
  alignImage: {
    marginTop: "27px",
    paddingLeft: "15px",
    display: "flex",
  },
  colorRed: {
    paddingTop: "10px",
    color: "red",
  },
  cardTitleWhite: {
    color: "white",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "5px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
});
export default signInSignUp;
