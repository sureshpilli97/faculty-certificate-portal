import { React, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
    InputLabel, TextField, MenuItem, Select,
    FormControl, Button,
    Modal,
    Box,
    Typography
} from '@mui/material';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import '../Styles/CertificateUploadStyle.css';
import FileDropzone from './FileDropzone';
import CircularProgress from '@mui/material/CircularProgress';
// import { useNavigate } from 'react-router-dom';
import GlobalTheme from '../Themes/GlobalTheme';


const CertificateUpload = () => {

    const [loader, setLoader] = useState(false);
    const [faculty, setFaculty] = useState([]);
    const [response, setResponse] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!localStorage.getItem('user')) {
    //         navigate('/login');
    //     }
    // });

    const type = ['Nptel'];
    const branches = ["CAI", "AIML", "CSE", "ECE", "EEE", "MECH", "CIVIL"]

    const SendToDatabase = (url, values) => {

        axios.post('https://faculty-certificate-server.vercel.app/upload', {
            faculty_id: values.faculty_id,
            certificate_name: values.certificate_name,
            type_of_certification: values.type_of_certification,
            certificate_url: url
        })
            .then(response => {
                setLoader(false);
                setResponse(response.data.message);
                setModalOpen(true);
            })
            .catch(error => {
                console.error('Error inserting certificate details:', error);
                setLoader(false);
                setResponse(response.data);
                setModalOpen(true);
            });

    }

    const getFaculty = (branch) => {
        axios.get('https://faculty-certificate-server.vercel.app/retrieve_faculty', {
            params: {
                conditions: `branch='${branch}'`
            }
        })
            .then(response => {
                setFaculty(response.data);
            })
            .catch(error => {
                console.error('Error fetching faculty data:', error);
            });
    }

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleChangeID = (e, setFieldValue) => {
        const faculty_id = e.target.value;
        const selectedFaculty = faculty.find(i => i.faculty_id === faculty_id);
        setFieldValue('faculty_id', faculty_id);
        setFieldValue('name', selectedFaculty ? selectedFaculty.name : '');
        setFieldValue('email', selectedFaculty ? selectedFaculty.email : '');
    }

    const validateform = Yup.object().shape({
        faculty_id: Yup.string()
            .required('Required'),
        name: Yup.string()
            .required('Required'),
        branch: Yup.string()
            .required('Required'),
        email: Yup.string()
            .matches(/^[a-zA-Z0-9._%+-]+@sves\.org\.in$/, 'Invalid email format sample@sves.org.in')
            .required('Required'),
        type_of_certification: Yup.string()
            .required('Required'),
        certificate_name: Yup.string()
            .required('Required'),
        certificate: Yup.mixed()
            .required('A certificate file is required')
            .test(
                'fileFormat',
                'Unsupported file format',
                value => value && (['application/pdf', 'image/jpeg', 'image/png'].includes(value.type))
            )
    });

    return (
        <div className="form-user">
            <Formik
                initialValues={{
                    faculty_id: '',
                    name: '',
                    branch: '',
                    email: '',
                    certificate_name: '',
                    type_of_certification: '',
                    certificate: null
                }}
                validationSchema={validateform}
                onSubmit={(values, { setFieldValue, resetForm }) => {
                    setLoader(true);
                    const file = values.certificate;
                    const storageRef = ref(storage, `facutly_certificates/${file.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on('state_changed',
                        (snapshot) => {
                            // Handle progress
                        },
                        (error) => {
                            console.error("File upload error:", error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                                SendToDatabase(url, values);
                                setFieldValue("certificate", null);
                                resetForm({ values: '' });
                            });
                        }
                    );
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <>
                        <Form onSubmit={handleSubmit} style={{ fontFamily: GlobalTheme.fontFamily }}>
                            <h3>Faculty Certificate Upload</h3>
                            <div className="form-group">
                                <FormControl sx={{ minWidth: 120 }}>
                                    <InputLabel>Branch</InputLabel>
                                    <Select
                                        name="branch"
                                        value={values.branch}
                                        onChange={(e) => {
                                            handleChange(e);
                                            getFaculty(e.target.value);
                                        }}
                                        onBlur={handleBlur}
                                        label="Branch"
                                        variant="outlined"
                                        error={errors.branch && touched.branch}
                                    >
                                        {
                                            branches.map((i) => {
                                                return <MenuItem key={i} value={i}>{i}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    <div style={{ color: GlobalTheme.errorColor, paddingLeft: 10 }} >
                                        {(errors.branch && touched.branch) && errors.branch}
                                    </div>
                                </FormControl>
                                <FormControl sx={{ minWidth: 120 }}>
                                    <InputLabel>Faculty</InputLabel>
                                    <Select
                                        name="faculty_id"
                                        value={values.faculty_id}
                                        onChange={(e) => handleChangeID(e, setFieldValue)}
                                        onBlur={handleBlur}
                                        label="Faculty ID"
                                        variant="outlined"
                                        error={errors.faculty_id && touched.faculty_id}
                                    >
                                        {
                                            faculty.map(i => (
                                                <MenuItem key={i.faculty_id} value={i.faculty_id}>
                                                    {i.faculty_id}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <div style={{ color: GlobalTheme.errorColor, paddingLeft: '1rem' }} >
                                        {(errors.faculty_id && touched.faculty_id) && errors.faculty_id}
                                    </div>
                                </FormControl>
                            </div>
                            <div className="form-group">
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={values.name}
                                    error={errors.name && touched.name}
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.name && touched.name) && errors.name}
                                />
                            </div>

                            <div className="form-group">
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={values.email}
                                    error={errors.email && touched.email}
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.email && touched.email) && errors.email}
                                />
                            </div>
                            <div className="form-group">
                                <FormControl sx={{ minWidth: 120 }}>
                                    <InputLabel>Type Of Certification</InputLabel>
                                    <Select
                                        label="Type Of Certification"
                                        name="type_of_certification"
                                        value={values.type_of_certification}
                                        error={errors.type_of_certification && touched.type_of_certification}
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {
                                            type.map((i) => {
                                                return <MenuItem key={i} value={i}>{i}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    <div style={{ color: GlobalTheme.errorColor, paddingLeft: 10 }} >
                                        {(errors.type_of_certification && touched.type_of_certification)
                                            && errors.type_of_certification}
                                    </div>
                                </FormControl>
                                <TextField
                                    label="Certificate Name"
                                    name="certificate_name"
                                    value={values.certificate_name}
                                    error={errors.certificate_name && touched.certificate_name}
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.certificate_name && touched.certificate_name) &&
                                        errors.certificate_name}
                                />
                            </div>
                            <div className="form-group">
                                <FileDropzone setFieldValue={setFieldValue} />
                            </div>
                            <Button
                                variant="contained"
                                type='submit'
                                id='submit-btn'
                                style={{
                                    fontFamily: GlobalTheme.fontFamily,
                                    backgroundColor: GlobalTheme.backgroundColor
                                }}
                            >{loader ? <CircularProgress color="inherit" size={24} /> : 'Submit'}</Button>
                        </Form>
                    </>
                )}
            </Formik>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
            >
                <Box className="modal-box">
                    <div className='model-div'>
                        <Typography id="modal-title" variant="h6" component="h2">
                            {response && response}
                        </Typography>
                        <Button
                            style={{ backgroundColor: GlobalTheme.backgroundColor, color: GlobalTheme.color }}
                            onClick={handleModalClose}>Close</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default CertificateUpload;
