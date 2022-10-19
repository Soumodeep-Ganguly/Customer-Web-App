import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col, Card, Image } from "react-bootstrap";
import { MdOutlinePhone, MdOutlinePermIdentity, MdMailOutline } from "react-icons/md";
import Swal from 'sweetalert2'
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

export default function Profile({ showModal, selectedCustomer, getAxiosInstance, getCustomers, Toast }) {
    const [customer, setCustomer] = useState(null)
    const [address, setAddress] = useState(null)

    const getCustomer = async () => {
        try {
            let { data } = await getAxiosInstance().post('/selectCustomerById', { id: selectedCustomer._id })
            console.log(data)
            setCustomer(data.result)
            setAddress(data.address)
        } catch (err) {
            console.log('ERR ', err)
        }
    }

    const deleteCustomer = async () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            html: '<h5>This customer details will be deleted?</h5>',
            showCancelButton: true,
            confirmButtonText: `Delete`,
            confirmButtonColor: '#D14343',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let { data } = await getAxiosInstance().post('/deleteCustomer', { id: selectedCustomer._id })
                    Toast.fire({ icon: 'success', title: `Customer deleted successfully.` })
                    setCustomer(null)
                    setAddress(null)
                    getCustomers()
                } catch (err) {
                    console.log('ERR ', err)
                }
            }
        })
    }

    useEffect(() => {
        if(selectedCustomer) {
            setCustomer(selectedCustomer)
            getCustomer()
        }
    }, [selectedCustomer])

    return (
        <>
            {customer && <Row style={{ overflowY: 'auto', height: '87vh' }}>
                <Col md={12} className="mt-1">
                    <Card className="p-3">
                        <Row className="pt-4 pb-4 pl-3">
                            <Col md={12}>
                                <div style={{ display: 'flex' }}>
                                    <Image src="https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png" roundedCircle height={75} style={{ marginLeft: 15, marginTop: 2 }} />
                                    <Row style={{ margin: 'auto 0' }}>
                                        <Col md={12}>
                                            <h5 style={{ marginTop: 10 }}>{customer?.firstName} {customer?.lastName}</h5>
                                        </Col>
                                        <Col md={12}>
                                            <div style={{ display: 'flex' }}>
                                                <p style={{ marginRight: 20 }}><MdOutlinePermIdentity style={{ marginRight: 5 }} />{customer?.userName}</p>
                                                <p style={{ marginRight: 20 }}><MdMailOutline style={{ marginRight: 5 }} />{customer?.email}</p>
                                                <p><MdOutlinePhone style={{ marginRight: 5 }} />{customer?.phone}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row className="pb-4 pl-3">
                            <Col md={{ span: 4, offset: 1 }} style={{ textAlign: 'center' }}>
                                <Button variant="outline-secondary" style={{ width: '30%' }} onClick={() => showModal()}>
                                    <FiEdit/>  Edit
                                </Button>
                                <Button variant="outline-danger" style={{ width: '60%', marginLeft: 10 }} onClick={() => deleteCustomer()}>
                                    <BsTrash />  Delete Customer
                                </Button>
                            </Col>
                        </Row>
                        <Row className="pb-4 pl-3">
                            <Col md={12} >
                                <h3>Personal Details</h3>
                            </Col>
                            <Col md={3}>
                                <Card className="p-2">
                                    <small>First Name</small>
                                    <h6>{customer.firstName}</h6>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="p-2">
                                    <small>Last Name</small>
                                    <h6>{customer.lastName}</h6>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="p-2">
                                    <small>Gender</small>
                                    <h6 style={{ textTransform: 'capitalize' }}>{customer.gender}</h6>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="p-2">
                                    <small>Date of Birth</small>
                                    <h6>{customer.dob}</h6>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="pb-4 pl-3">
                            <Col md={12} >
                                <h3>Address</h3>
                            </Col>
                            <Col md={6} >
                                <Table striped bordered hover>
                                    <tbody>
                                        <tr>
                                            <td>Address Line 1</td>
                                            <td>{address?.address}</td>
                                        </tr>
                                        <tr>
                                            <td>Landmark</td>
                                            <td>{address?.landmark}</td>
                                        </tr>
                                        <tr>
                                            <td>City</td>
                                            <td>{address?.city}</td>
                                        </tr>
                                        <tr>
                                            <td>State</td>
                                            <td>{address?.state}</td>
                                        </tr>
                                        <tr>
                                            <td>Country</td>
                                            <td>{address?.country}</td>
                                        </tr>
                                        <tr>
                                            <td>ZipCode</td>
                                            <td>{address?.zipCode}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>}
            {!customer && <Row style={{ height: '87vh' }}>
                <h4 style={{ margin: 'auto', width: '100%', textAlign: 'center' }}>
                    No Customer Selected
                </h4>
            </Row>}
        </>
    )
}
