import React, { useState, useEffect } from 'react'
import { Nav, Form, InputGroup, Row, Col, Card, Image } from "react-bootstrap";
import { MdSearch, MdOutlineAddBox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function SideNav({ showModal, customers, setCustomer, sortBy, setSortBy, pages, page, setPage, setSearch, search, searchCustomer }) {
    return (
        <div style={{ position: 'relative', height: '85vh' }}>
            <InputGroup className="mt-3">
                <Form.Control placeholder="Customers" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => searchCustomer()}><MdSearch /></InputGroup.Text>
                <InputGroup.Text style={{ cursor: 'pointer' }} onClick={showModal}><MdOutlineAddBox /></InputGroup.Text>
            </InputGroup>
            <Row>
                <Col md={{ span: 4, offset: 8 }}>
                    <Form.Select size="sm" className="mt-1" id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Sort By</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row style={{ overflowY: 'auto', height: '70vh' }}>
                {customers.map((customer) => (
                    <Col md={12} key={customer._id} className="mt-1">
                        <Card onClick={() => setCustomer(customer)} className="customerCard" style={{ cursor: 'pointer' }}>
                            <Row className="pt-1 pb-1">
                                <Col sm={3}>
                                    <Image src="https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png" roundedCircle height={45} style={{ margin: 'auto 0', marginLeft: 15 }} />
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
            <Row style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <div>
                    <MdKeyboardArrowLeft style={{ cursor: 'pointer' }}  
                        onClick={() => {
                            if(page > 0) setPage(page - 1)
                        }}
                    /> <span>Page {page + 1} of {pages}</span> 
                    <MdKeyboardArrowRight style={{ cursor: 'pointer' }} 
                        onClick={() => {
                            if(page < (pages - 1)) setPage(page + 1)
                        }}
                    />
                </div>
            </Row>
        </div>
    )
}
