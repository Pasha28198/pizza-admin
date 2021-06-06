import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import Breadcrumb from '../common/breadcrumb';
import { Accordion } from "react-bootstrap";
import axios from "../../request/request";
import rawAxios from "axios";
import Modal from "react-responsive-modal";
import UpdateIcon from "../../assets/images/update.png";
import Notification from "../common/notification/notification";
import fileDownload from "js-file-download";
// import queryString from 'query-string';
// import profilePic from '../../assets/images/profile.png';
import moment from "moment";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Table,
  Button,
} from "reactstrap";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModalDeleteOrder, setOpenModalDeleteOrder] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState(null);
  const [loaderItem, setLoaderItem] = useState("none");

  const location = useLocation();
  // const profileImage = localStorage.getItem('profileImage')

  const getAllOrders = () => {
    setLoading(true);

    axios({
      method: "get",
      url: "/admin/getAllOrders",
    })
      .then((response) => {
        setOrders(response && response.data.orders);
        setLoading(false);
      })
      .catch((error) => {
        setMessage("Oops! Can not connect to the database. Try again.");
      });
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    console.log(token);
    setLoading(true);
    if (token) {
      getOrderAll(token);
    } else {
      axios({
        method: "get",
        url: "/admin/getAllOrders",
      })
        .then((response) => {
          setOrders(response && response.data.orders);
          setLoading(false);
        })
        .catch((error) => {
          setMessage("Oops! Can not connect to the database. Try again.");
        });

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }, []);

  const getOrderAll = (token) => {
    rawAxios({
      method: "get",
      url: "https://data.diggiart.com/api/admin/getAllOrders",
      headers: { Authorization: token },
    })
      .then((response) => {
        setOrders(response && response.data.orders);
        setLoading(false);
      })
      .catch((error) => {
        setMessage("Oops! Can not connect to the database. Try again.");
      });

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const onOpenModal = (orderId, id) => {
    setOpen(true);
    setOrderId(orderId);
    setIndex(id);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const onOpenModalDeleteOrder = (orderId) => {
    console.log(orderId);
    setDeleteOrderId(orderId);
    setOpenModalDeleteOrder(true);
  };

  const onCloseModalDeleteOrder = () => {
    setOpenModalDeleteOrder(false);
  };

  const updateStatus = (status) => {
    setOpen(false);
    setMessage("Updating order status ...");

    axios({
      method: "post",
      url: `/admin/updateOrder/${orderId}`,
      data: { status: status },
    })
      .then((response) => {
        console.log(response);
        orders[index].status = status;
        setMessage("Order status updated successfully");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Oops! Error occured. Try again.");
      });

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const fetchBillingDetails = async (orderId, index) => {
    setLoaderItem(index);
    await axios({
      method: "get",
      url: `/admin/update/order-billing-details/${orderId}`,
    })
      .then((response) => {
        if (response.data.order) {
          const newOrder = response.data.order || {};

          const updateOrders = orders.map((i) => {
            if (newOrder._id === i._id) {
              return {
                ...i,
                ...newOrder,
              };
            }
            return i;
          });
          setOrders(updateOrders);
        }
        setLoaderItem("none");
      })
      .catch((error) => {
        setMessage("Oops! Error occured. Try again.");
        setLoaderItem("none");
      });
  };

  const deleteOrder = async () => {
    axios({
      method: "delete",
      url: `/admin/delete/order`,
      data: { id: deleteOrderId },
    })
      .then(() => {
        // getAllOrders();
        onCloseModalDeleteOrder();
        window.location.reload();
      })
      .catch((error) => {});
  };

  return (
    <div className="mt-3">
      <Row>
        <Col sm="12">
          <Accordion>
            <Card>
              <CardHeader>
                <h5> Available Orders </h5>
              </CardHeader>
              <CardBody>
                <div className="default-according" id="accordionclose">
                  {orders.length > 0 ? (
                    orders.map((order, id) => (
                      <Card key={id}>
                        <CardHeader>
                          <h5 className="mb-0">
                            <Accordion.Toggle
                              as={Card.Header}
                              className="btn btn-link"
                              color="default"
                              eventKey={`key-${id}`}
                            >
                              <span className="d-flex justify-content-between">
                                <span className="text-uppercase col">
                                  {" "}
                                  #{order.orderId}{" "}
                                </span>

                                <span className="float-right">
                                  <span className="ml-2 col">
                                    {moment
                                      .utc(order.createdAt)
                                      .local()
                                      .format(" h:mm A - Do MMM, YYYY")}{" "}
                                  </span>

                                  <span className="ml-2 col">
                                    {order.status === "accepted" ? (
                                      <Badge color="success">Accepted</Badge>
                                    ) : order.status === "rejected" ? (
                                      <Badge color="danger">Rejected</Badge>
                                    ) : (
                                      <Badge color="warning">Pending</Badge>
                                    )}
                                  </span>
                                </span>
                              </span>
                            </Accordion.Toggle>
                          </h5>
                        </CardHeader>

                        <Accordion.Collapse eventKey={`key-${id}`}>
                          <CardBody>
                            <h2 className="text-center">Order Information</h2>
                            <Table>
                              <tbody>
                                <tr>
                                  <td className="font-weight-bold">Order ID</td>
                                  <td> {order.orderId}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">Name</td>
                                  <td>
                                    {" "}
                                    {order.firstName} {order.lastName}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">Format</td>
                                  <td> {order.format}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">Quantity</td>
                                  <td> {order.quantity}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">Email</td>
                                  <td> {order.email}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">
                                    Phone Number
                                  </td>
                                  <td> {order.phoneNumber}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">
                                    Address 1
                                  </td>
                                  <td> {order.address1}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">
                                    Address 2
                                  </td>
                                  <td> {order.address2}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">City</td>
                                  <td> {order.city}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">Zip Code</td>
                                  <td> {order.zipCode}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">Status</td>
                                  <td className="text-capitalize font-weight-bold">
                                    {" "}
                                    {order.status}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">Price</td>
                                  <td> {order.price}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">
                                    VAT (25%)
                                  </td>
                                  <td> {order.vat}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">Total</td>
                                  <td> {order.total}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">
                                    Payment Provider
                                  </td>
                                  <td> {order.paymentProvider || " - "}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">
                                    Payment Status
                                  </td>
                                  <td>
                                    {order.paymentStatus === "PAID"
                                      ? order.paymentStatus
                                      : "Pending"}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold">File</td>
                                  <td className="">
                                    <a href={order.image} target="_blank">
                                      <Button color="success">Download</Button>
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>

                            <hr />
                            {order.paymentStatus !== "PAID" && (
                              <div className="text-center mt-3">
                                <Button
                                  color="secondary"
                                  onClick={() =>
                                    fetchBillingDetails(order._id, id)
                                  }
                                >
                                  {loaderItem === id
                                    ? "Updating..."
                                    : "FETCH BILLING or PAYMENT DETAILS"}
                                </Button>
                              </div>
                            )}

                            <div className="text-center mt-3">
                              <Button
                                color="primary"
                                onClick={() => onOpenModal(order._id, id)}
                              >
                                UPDATE ORDER STATUS
                              </Button>
                            </div>
                            <div className="text-center mt-3">
                              <Button
                                color="danger"
                                onClick={() =>
                                  onOpenModalDeleteOrder(order._id)
                                }
                              >
                                DELETE ORDER
                              </Button>
                            </div>
                          </CardBody>
                        </Accordion.Collapse>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center text-danger font-weight-bold">
                      {" "}
                      No order available{" "}
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Accordion>

          <Modal open={open} onClose={onCloseModal}>
            <div className="modal-body text-center">
              <div className="product-modal">
                <img src={UpdateIcon} width="100px" alt="Update Icon" />
                <h4 className="mt-3">Change the order status</h4>
                <div className="addcart-btn mt-4">
                  <button
                    className="btn btn-success m-r-10"
                    type="button"
                    onClick={() => updateStatus("accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => updateStatus("rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          <Modal open={openModalDeleteOrder} onClose={onCloseModalDeleteOrder}>
            <div className="modal-body text-center">
              <div className="product-modal">
                <h4 className="mt-3">Delete order?</h4>
                <div className="addcart-btn mt-4">
                  <button
                    className="btn btn-success m-r-10"
                    type="button"
                    onClick={onCloseModalDeleteOrder}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={deleteOrder}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </Col>

        <Notification message={message} visibility={message} />
      </Row>
    </div>
  );
};

export default Dashboard;
