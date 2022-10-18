import React, { useState, useEffect } from 'react'
import { Row, Col, Modal, Button, FloatingLabel, Form } from 'react-bootstrap'
import { MdDone, MdClear, MdBookmark } from "react-icons/md";

export default function CustomerModal({ showModal, handleClose, type, getAxiosInstance, onComplete, selectedCustomer, setSelectedCustomer }) {
    const [step, setStep] = useState(0)

    // Customer Details
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [gender, setGender] = useState("")

    // Customer Address Store 
    const [addressData, setAddress] = useState("")
    const [landmark, setLandmark] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [zipCode, setZipCode] = useState("")

    const saveCustomer = async () => {
        let customer = {
            firstName,  lastName, userName, email, phone, 
            dob: dateOfBirth, gender
        }
        let address = { address: addressData, landmark, city, state, country, zipCode }

        let link = '/insertCustomer'
        let params = { customer, address }
        if(selectedCustomer && type === 'Edit') {
            link = '/updateCustomer'
            params['id'] = selectedCustomer._id
        }

        try {
            let { data } = await getAxiosInstance().post(link, params)
            // console.log("DAT ",data)
            cancelSave()
            onComplete()
            setSelectedCustomer(data.result)
        } catch (err) {
            console.log('ERR ', err)
        }
    }

    const cancelSave = () => {
        handleClose()
        setStep(0)

        // Clear Customer Details
        setFirstName("")
        setLastName("")
        setUserName("")
        setEmail("")
        setPhone("")
        setDateOfBirth("")
        setGender("")

        // Clear Address
        setAddress("")
        setLandmark("")
        setCity("")
        setState("")
        setCountry("")
        setZipCode("")
    }

    const getCustomer = async () => {
        try {
            let { data } = await getAxiosInstance().post('/selectCustomerById', { id: selectedCustomer._id })
            // console.log(data)
            // Clear Customer Details
            setFirstName(data.result?.firstName)
            setLastName(data.result?.lastName)
            setUserName(data.result?.userName)
            setEmail(data.result?.email)
            setPhone(data.result?.phone)
            setDateOfBirth(data.result?.dob)
            setGender(data.result?.gender)

            // Clear Address
            setAddress(data.address?.address)
            setLandmark(data.address?.landmark)
            setCity(data.address?.city)
            setState(data.address?.state)
            setCountry(data.address?.country)
            setZipCode(data.address?.zipcode)
        } catch (err) {
            console.log('ERR ', err)
        }
    }

    useEffect(() => {
        if(selectedCustomer && type === 'Edit' && showModal) getCustomer()
    }, [selectedCustomer, type, showModal])

    return (
        <Modal 
            show={showModal} 
            onHide={handleClose} 
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Row>
                    <h4>{type} Customer Details</h4>
                </Row>
                {/* Customer Form */}
                {step === 0 && <Row>
                    <Col md={12}>
                        <FloatingLabel controlId="floatingFirstName" label="Enter First Name" className="mb-2" >
                            <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingLastName" label="Enter Last Name" className="mb-2">
                            <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingUserName" label="Enter Username" className="mb-2">
                            <Form.Control type="text" placeholder="Enter Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingEmail" label="Enter Email" className="mb-2">
                            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPhoneNumber" label="Enter Phone Number" className="mb-2">
                            <Form.Control type="number" min={1} placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingDateOfBirth" label="Enter Date Of Birth" className="mb-2">
                            <Form.Control type="date" placeholder="Enter Date Of Birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingGender" label="Select Gender" className="mb-2">
                            <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>}

                {step === 1 && <Row>
                    <Col md={12}>
                        <FloatingLabel controlId="floatingAddress" label="Enter Address" className="mb-2" >
                            <Form.Control type="text" placeholder="Enter Address" value={addressData} onChange={(e) => setAddress(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingLandmark" label="Enter Landmark" className="mb-2">
                            <Form.Control type="text" placeholder="Enter Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingCity" label="Enter City" className="mb-2">
                            <Form.Control type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingState" label="Enter State" className="mb-2">
                            <Form.Control type="text" placeholder="Enter State" value={state} onChange={(e) => setState(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingCountry" label="Enter Country" className="mb-2">
                            <Form.Control type="text" placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingZipCode" label="Enter Zip Code" className="mb-2">
                            <Form.Control type="number" min={1} placeholder="Enter Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                </Row>}

                {/* Cancel or Complete Actions */}
                <Row className="justify-content-center">
                    <Col sm={6} style={{ textAlign: 'center' }}>
                        <Button variant="outline-secondary" style={{ width: '100%' }} onClick={cancelSave}>
                            <MdClear/>  Cancel
                        </Button>
                    </Col>
                    {step === 0 && <Col sm={6} style={{ textAlign: 'center' }}>
                        <Button variant="outline-primary" style={{ width: '100%' }} onClick={() => setStep(1)}>
                            <MdDone />  Proceed
                        </Button>
                    </Col>}
                    {step === 1 && <Col sm={6} style={{ textAlign: 'center' }}>
                        <Button variant="outline-primary" style={{ width: '100%' }} onClick={() => saveCustomer()}>
                            <MdBookmark />  Save
                        </Button>
                    </Col>}
                </Row>
            </Modal.Body>
        </Modal>
    )
}
