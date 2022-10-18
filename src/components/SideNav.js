import React, { useState, useEffect } from 'react'
import { Nav, Form, InputGroup, Row, Col, Card, Image } from "react-bootstrap";
import { MdSearch, MdOutlineAddBox } from "react-icons/md";

export default function SideNav({ showModal, customers, setCustomer, sortBy, setSortBy, pages, setSearch, search, searchCustomer }) {
    return (
        <>
            <InputGroup className="mt-3">
                <Form.Control placeholder="Customers" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => searchCustomer()}><MdSearch /></InputGroup.Text>
                <InputGroup.Text style={{ cursor: 'pointer' }} onClick={showModal}><MdOutlineAddBox /></InputGroup.Text>
            </InputGroup>
            <Row>
                <Col md={{ span: 4, offset: 8 }}>
                    <Form.Select size="sm" className="mt-1" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Sort By</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                {customers.map((customer) => (
                    <Col md={12} key={customer._id} className="mt-1">
                        <Card onClick={() => setCustomer(customer)} style={{ cursor: 'pointer' }}>
                            <Row className="pt-1 pb-1">
                                <Col sm={3}>
                                    <Image src="https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png" roundedCircle height={45} style={{ marginLeft: 15, marginTop: 2 }} />
                                </Col>
                                <Col sm={9}>
                                    <h6>{customer.firstName} {customer.lastName}</h6>
                                    <small>{customer.email}</small>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}
