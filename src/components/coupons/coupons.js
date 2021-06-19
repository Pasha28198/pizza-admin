import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Accordion } from "react-bootstrap";
import axios from "../../request/request";
import rawAxios from "axios";
import Modal from "react-responsive-modal";
import UpdateIcon from "../../assets/images/update.png";
import Notification from "../common/notification/notification";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Input,
  Table,
  Button,
  FormGroup,
  Label,
} from "reactstrap";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [couponeCode, setCouponeCode] = useState("");

  const [material, setMaterial] = useState("posters");
  const [price, setPrice] = useState(249);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState(null);
  const [loaderItem, setLoaderItem] = useState("none");

  const location = useLocation();
  // const profileImage = localStorage.getItem('profileImage')

  const getCouponse = () => {
    return axios({
      method: "get",
      url: "/products/categories",
    })
      .then((response) => {
        setOrders(response && response.data);
        setLoading(false);
      })
      .catch((error) => {
        setMessage("Oops! Can not connect to the database. Try again.");
      });
  };

  const deleteCoupon = (id) => {
    return axios({
      method: "post",
      url: "/admin/deleteCoupon",
      data: { id },
    })
      .then((response) => {
        getCouponse();
        setLoading(false);
      })
      .catch((error) => {
        setMessage("Oops! Can not connect to the database. Try again.");
      });
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setLoading(true);

    getCouponse();

    setTimeout(() => {
      setMessage(null);
    }, 3000);

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }, []);

  const onOpenModal = (orderId, id) => {
    setOpen(true);
    setOrderId(orderId);
    setIndex(id);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const createCoupon = (status) => {
    setOpen(false);
    setMessage("Updating order status ...");

    axios({
      method: "post",
      url: `/products/category`,
      data: {
        name: couponeCode
      },
    })
      .then((response) => {
        setMessage("Coupon created successfully");
        getCouponse();
      })
      .catch((error) => {
        setMessage("Oops! Error occured. Try again.");
      });

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <div className="mt-3">
      <Row>
        <Col sm="12">
          <Accordion>
            <Card>
              <CardHeader>
                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                >
                  <h5> Available Coupons </h5>
                  <Button onClick={onOpenModal}>Create Category</Button>
                </div>
              </CardHeader>
              <CardBody>
                <div className="default-according" id="accordionclose">
                  {orders.length > 0 ? (
                    <Table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Category name</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((item, dx) => (
                          <tr key={item._id}>
                            <td> {++dx} </td>
                            <td> {item.name} </td>

                            <td>
                              <Button onClick={() => deleteCoupon(item._id)}>
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <div className="text-center text-danger font-weight-bold">
                      {" "}
                      No coupons available{" "}
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Accordion>

          <Modal open={open} onClose={onCloseModal}>
            <div className="modal-body text-center">
              <div className="product-modal">
                <h4 className="mt-3">Create category</h4>
                <Input
                  placeholder="Category name"
                  value={couponeCode}
                  onChange={(e) => {
                    setCouponeCode(e.target.value);
                  }}
                />
                {/*<FormGroup style={{ marginTop: 10 }}>*/}
                {/*  <Input*/}
                {/*    onChange={(e) => {*/}
                {/*      setPrice(e.target.value);*/}
                {/*    }}*/}
                {/*    value={price}*/}
                {/*    type="select"*/}
                {/*    name="select"*/}
                {/*    id="exampleSelect"*/}
                {/*  >*/}
                {/*    {material === "posters" ? (*/}
                {/*      <>*/}
                {/*        <option value={249}>249</option>*/}
                {/*        <option value={299}>299</option>*/}
                {/*      </>*/}
                {/*    ) : (*/}
                {/*      <>*/}
                {/*        <option value={720}>720</option>*/}
                {/*        <option value={540}>540</option>*/}
                {/*      </>*/}
                {/*    )}*/}
                {/*  </Input>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup style={{ marginTop: 10 }}>*/}
                {/*  <Input*/}
                {/*    onChange={(e) => {*/}
                {/*      setMaterial(e.target.value);*/}
                {/*      if (e.target.value === "posters") {*/}
                {/*        setPrice(249);*/}
                {/*      } else {*/}
                {/*        setPrice(720);*/}
                {/*      }*/}
                {/*    }}*/}
                {/*    value={material}*/}
                {/*    type="select"*/}
                {/*    name="select"*/}
                {/*    id="exampleSelect"*/}
                {/*  >*/}
                {/*    <option value={"posters"}>Posters</option>*/}
                {/*    <option value={"polycanvas"}>Polycanvas</option>*/}
                {/*  </Input>*/}
                {/*</FormGroup>*/}
                <div className="addcart-btn mt-4">
                  <button
                    className="btn btn-success m-r-10"
                    type="button"
                    onClick={() => createCoupon()}
                  >
                    Create
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={onCloseModal}
                  >
                    Cancel
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
