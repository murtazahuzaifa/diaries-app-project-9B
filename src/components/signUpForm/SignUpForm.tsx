import React, { FC } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {AccountCircle, EmailRounded} from '@material-ui/icons';
import LockRounded from '@material-ui/icons/LockRounded';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import { Typography, Grid,} from '@material-ui/core';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import ColorButton from '../../components/buttons/GreenButton';
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
    password: string;
    showPassword: boolean;
    confirmPassword: string;
    showConfirmPassword: boolean;
}
interface FormValues {
    userName: string;
    password: string;
    confirmPassword: string;
    email?: string;
}

const formInitialValue: FormValues = {
    userName: '', password: '', confirmPassword: '', email: '',
}
const fromSchema = Yup.object<FormValues>({
    userName: Yup.string()
        .required("User name is required"),
    password: Yup.string()
        .required('Password is required')
        .min(8, "Atleast 8 characters"),
    confirmPassword: Yup.string()
        .required('Password is required')
        .min(8, "Atleast 8 characters"),
    email: Yup.string().optional(),
})

const SignUpForm: FC<{setCridentails?:(val:FormValues)=>void}> = ({setCridentails})=>{
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
        setSubmitting(false)
        if (setCridentails) setCridentails(values)
    }

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
                                        <Field required component={TextField} name="userName" label="User Name" type='text' />
                                    </Grid>
                                </Grid>
                            </div>

                            <div className={clsx(classes.margin)} >
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item> <LockRounded /></Grid>
                                    <Grid item>
                                        <Field required component={TextField} name="password" label="Password" type={values.showPassword ? 'text' : 'password'} />
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
                                        <Field required component={TextField} name="confirmPassword" label="Confrim Password" type={values.showConfirmPassword ? 'text' : 'password'} />
                                    </Grid>
                                    <Grid item>
                                        <div onClick={handleClickShowPassword('showConfirmPassword')} >
                                            {values.showConfirmPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                            <div className={classes.margin}>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <EmailRounded />
                                    </Grid>
                                    <Grid item>
                                        <Field component={TextField} name="email" label="Email (optional)" type='text' />
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