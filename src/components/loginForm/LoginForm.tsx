import React, { FC } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockRounded from '@material-ui/icons/LockRounded';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
// import Button from '@material-ui/core/Button';
// import { green } from '@material-ui/core/colors';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { Typography, Grid,} from '@material-ui/core';
import ColorButton from '../../components/buttons/GreenButton';
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
    // password: string;
    showPassword: boolean;
}
interface FormValues {
    userName: string;
    password: string
}

const formInitialValue:FormValues = {
    userName: 'superuser',
    password: '12345678',
}


const LoginForm: FC<{setCridentails?:(val:FormValues)=>void}> = ({setCridentails}) => {
    const classes = useStyles();

    const [values, setValues] = React.useState<State>({
        // password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    // const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValues({ ...values, [prop]: event.target.value });
    //   };

    const onSubmit = (values:FormValues, { setSubmitting }:FormikHelpers<FormValues>):void => {
        setSubmitting(false)
        if (setCridentails) setCridentails(values)
    }

    const fromSchema = Yup.object<FormValues>({
            userName: Yup.string()
                .required("User name is required"),
            password: Yup.string()
                .required('Password is required')
                .min(8, "Atleast 8 characters"),
        })

    return (
            <div  className={classes.container} >
                <Typography variant='h4' component={'div'} display="block" gutterBottom >Login</Typography>
                <hr className={classes.seperator} />
                <Formik initialValues={formInitialValue} validationSchema={ fromSchema } onSubmit={onSubmit} >
                    {(formik) => (
                        <Form >
                            <div className={classes.margin}>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item> <AccountCircle /> </Grid>
                                    <Grid item>
                                        <Field required component={TextField} name="userName" label="User Name" type='text' />
                                    </Grid>
                                </Grid>
                            </div>

                            <div className={clsx(classes.margin)} >
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item> <LockRounded /></Grid>
                                    <Grid item>
                                        <Field required component={TextField} label="Password" name="password" 
                                            type={values.showPassword ? 'text' : 'password'}  />
                                    </Grid>
                                    <Grid item>
                                        <div onClick={handleClickShowPassword} >
                                            {values.showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <br />
                            <ColorButton className={clsx(classes.margin)} variant="contained" color="primary" type='submit' disabled={formik.isSubmitting} > Login </ColorButton>
                        </Form>
                    )}
                </Formik>
            </div>
    )
}

export default LoginForm;