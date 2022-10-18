import React, { useState, useEffect } from 'react'
import { ThemeProvider, Container, Row, Col } from 'react-bootstrap'
import CustomerModal from './components/CustomerModal';
import Profile from './components/Profile';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import { getAxiosInstance } from './utils/axios'

function App() {
  const [customers, setCustomers] = useState([])
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("Add")
  const [sortBy, setSortBy] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const getCustomers = async () => {
    try {
      let { data } = await getAxiosInstance().get(`/selectCustomers?search=${search}&sortBy=${sortBy}`)
      console.log("DAT ",data)
      setCustomers(data.result)
      setTotalCustomers(data.count)
    } catch (err) {
      // console.log('ERR ', err)
    }
  }

  useEffect(() => {
    getCustomers()
  }, [sortBy])

  const handleClose = () => setShowModal(false)
  const handleOpen = (type) => {
    setShowModal(true)
    setModalType(type)
  }

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <TopNav />
      <Container fluid>
        <Row>
          <Col md={3}>
            <SideNav 
              showModal={() => handleOpen("Add")}
              customers={customers}
              setCustomer={setSelectedCustomer}
              sortBy={sortBy}
              setSortBy={setSortBy}
              pages={totalCustomers>0?Math.ceil(totalCustomers/perPage):1}
              setSearch={setSearch}
              search={search}
              searchCustomer={() => getCustomers()}
            />
          </Col>
          <Col md={9}>
            <Profile 
              showModal={() => handleOpen("Edit")}
              selectedCustomer={selectedCustomer}
              getAxiosInstance={getAxiosInstance}
              getCustomers={getCustomers}
            />
          </Col>
        </Row>
      </Container>
      <CustomerModal 
        showModal={showModal}
        handleClose={handleClose}
        type={modalType}
        getAxiosInstance={getAxiosInstance}
        onComplete={getCustomers}
        setSelectedCustomer={setSelectedCustomer}
        selectedCustomer={selectedCustomer}
      />
    </ThemeProvider>
  );
}

export default App;
