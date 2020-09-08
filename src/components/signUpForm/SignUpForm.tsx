import React, { FC } from 'react';
import { createStyles, Theme, makeStyles, withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockRounded from '@material-ui/icons/LockRounded';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
// import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
// import Typography from "@material-ui/core/Typography";
import { Button, LinearProgress, Typography, Grid, FormControl } from '@material-ui/core';
import { Formik, Form, Field, FormikHelpers } from 'formik';
// import TextField from '@material-ui/core/TextField';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
        textField: {
            width: '25ch',
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '287px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255,255,255,1)',
        },
        seperator: {
            width: '80%',
            border: '2px solid green',
            backgroundColor: 'green',

        }

    }),
);

interface State {
    password: string;
    showPassword: boolean;
    confirmPassword: string;
    showConfirmPassword: boolean;
}
interface FormValues {
    userId: string;
    password: string;
    confirmPassword: string;
}

const formInitialValue: FormValues = {
    userId: '', password: '', confirmPassword: '',
}
const fromSchema = Yup.object<FormValues>({
    userId: Yup.string()
        .required("Name field is required"),
    password: Yup.string()
        .required('Password is required')
        .min(8, "Atleast 8 characters"),
    confirmPassword: Yup.string()
        .required('Password is required')
        .min(8, "Atleast 8 characters"),
})

const SignUpForm: FC = () => {
    const classes = useStyles();

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
    });

    const handleClickShowPassword = (prop: keyof State) => () => {
        setValues({ ...values, [prop]: !values[prop] });
    };
    const handleValidateForm = (value: FormValues) => {
        const errors: Partial<FormValues> = {}
        if (value.password !== value.confirmPassword) {
            errors.confirmPassword = "Password not matched"
        }
        return errors
    }
    const onSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>): void => {
        console.log(values);
        setSubmitting(false)
    }

    const ColorButton = withStyles((theme: Theme) => ({
        root: {
            color: theme.palette.getContrastText(green[500]),
            backgroundColor: green[500],
            width: '100%',
            '&:hover': {
                backgroundColor: green[700],
            },
        },
    }))(Button);

    return (
        <React.Fragment >
            <div className={classes.container} >
                <Typography variant='h4' component={'div'} gutterBottom >Sign Up</Typography>

                <hr className={classes.seperator} />

                <Formik initialValues={formInitialValue} validate={handleValidateForm} validationSchema={fromSchema} onSubmit={onSubmit} >
                    {(formik) => (
                        <Form >
                            <div className={classes.margin}>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <AccountCircle />
                                    </Grid>
                                    <Grid item>
                                        <Field component={TextField} name="userId" label="User ID" type='text' />
                                    </Grid>
                                </Grid>
                            </div>

                            <div className={clsx(classes.margin)} >
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item> <LockRounded /></Grid>
                                    <Grid item>
                                        <Field component={TextField} name="password" label="Password" type={values.showPassword ? 'text' : 'password'} />
                                    </Grid>
                                    <Grid item>
                                        <div onClick={handleClickShowPassword('showPassword')} >
                                            {values.showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={clsx(classes.margin)} >
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item> <LockRounded /></Grid>
                                    <Grid item>
                                        <Field component={TextField} name="confirmPassword" label="Confrim Password" type={values.showConfirmPassword ? 'text' : 'password'} />
                                    </Grid>
                                    <Grid item>
                                        <div onClick={handleClickShowPassword('showConfirmPassword')} >
                                            {values.showConfirmPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <br />
                            <ColorButton onClick={undefined} className={clsx(classes.margin)} variant="contained" color="primary" type='submit' disabled={formik.isSubmitting} > Sign UP </ColorButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </React.Fragment>
    )
}

export default SignUpForm;