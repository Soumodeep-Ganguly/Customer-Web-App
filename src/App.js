import React, { useState, useEffect } from 'react'
import { ThemeProvider, Container, Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import CustomerModal from './components/CustomerModal';
import Profile from './components/Profile';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import { getAxiosInstance } from './utils/axios'


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

function App() {
  const [customers, setCustomers] = useState([])
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("Add")
  const [sortBy, setSortBy] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const getCustomers = async () => {
    try {
      let { data } = await getAxiosInstance().get(`/selectCustomers?search=${search}&sortBy=${sortBy}&limit=${perPage}&skip=${page*perPage}`)
      console.log("DAT ",data)
      setCustomers(data.result)
      setTotalCustomers(data.count)
    } catch (err) {
      // console.log('ERR ', err)
    }
  }

  useEffect(() => {
    getCustomers()
  }, [sortBy, page])

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
              setPage={setPage}
              page={page}
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
              Toast={Toast}
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
        Toast={Toast}
      />
    </ThemeProvider>
  );
}

export default App;
