import React, { useState, useEffect } from "react";
import {useHistory, useLocation} from "react-router-dom";

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
  const history = useHistory()
  const [orders, setOrders] = useState([]);

  const [categories, setCategories] = useState([]);
  const [couponeCode, setCouponeCode] = useState("");
  const [description, setDescription] = useState("");

  const [mass, setMass] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const [material, setMaterial] = useState("posters");
  const [productId, setProductId] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [openCreateChoise, setOpenCreateChoise] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState(null);
  const [loaderItem, setLoaderItem] = useState("none");

  const location = useLocation();
  // const profileImage = localStorage.getItem('profileImage')

  const getCouponse = () => {
    return axios({
      method: "get",
      url: "/products",
    })
      .then((response) => {
        console.log(response)
        setOrders(response && response.data);
        setLoading(false);
      })
      .catch((error) => {
        setMessage("Oops! Can not connect to the database. Try again.");
      });
  };

  const getCategory = () => {
    return axios({
      method: "get",
      url: "/products/categories",
    })
        .then((response) => {
          console.log(response)
          setCategories(response && response.data);
          setLoading(false);
        })
        .catch((error) => {
          setMessage("Oops! Can not connect to the database. Try again.");
        });
  };



  const deleteCoupon = (id) => {
    console.log(id);
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
    getCategory()
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

  const onCloseCreateChoiseModal = () => {
    setOpenCreateChoise(false);
  };
  console.log(productId)
  const createCoupon = (status) => {
    setOpen(false);
    setMessage("Updating order status ...");

    axios({
      method: "post",
      url: `/products`,
      data:   {

        title: couponeCode,
        description: description,
        categoryId: categoryId
  },
    })
      .then((response) => {
        console.log(response);
        setMessage("Coupon created successfully");
        setOpenCreateChoise(true)
        setProductId(response.data._id)
        getCouponse();
      })
      .catch((error) => {
        console.log(error);
        setMessage("Oops! Error occured. Try again.");
      });

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };



  const createChoise = (status) => {
    setOpen(false);
    setMessage("Updating order status ...");

    axios({
      method: "post",
      url: `/products/choise`,
      data:   {
        product: productId,
        mass: mass,
        type: type,
        price: price
      },
    })
        .then((response) => {
          console.log(response);
          setMessage("Coupon created successfully");
          setOpenCreateChoise(true)
          getCouponse();
        })
        .catch((error) => {
          console.log(error);
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
                  <h5> Available Products </h5>
                  <Button onClick={onOpenModal}>Create Product</Button>
                </div>
              </CardHeader>
              <CardBody>
                <div className="default-according" id="accordionclose">
                  {orders.length > 0 ? (
                    <Table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Product name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((item, dx) => (
                          <tr key={item._id}>
                            <td> {++dx} </td>
                            <td onClick={()=>history.push(`/products/${item._id}`)}> {item.title} </td>

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
                <h4 className="mt-3">Create products</h4>
                <Input
                  placeholder="Name"
                  value={couponeCode}
                  onChange={(e) => {
                    setCouponeCode(e.target.value);
                  }}
                />
                <Input
                    style={{marginTop: 10}}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                />
                <FormGroup style={{ marginTop: 10 }}>
                  <Input
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                    }}
                    value={categoryId}
                    type="select"
                    name="select"
                    id="exampleSelect"
                  >
                    {categories.map((item)=>{
                      return  <option value={item._id}>{item.name}</option>
                    })}
                  </Input>
                </FormGroup>

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

          <Modal open={openCreateChoise} onClose={onCloseCreateChoiseModal}>
            <div className="modal-body text-center">
              <div className="product-modal">
                <h4 className="mt-3">Create choise</h4>
                <Input
                    placeholder="Mass"
                    value={mass}
                    onChange={(e) => {
                      setMass(e.target.value);
                    }}
                />
                <Input
                    style={{marginTop: 10}}
                    placeholder="Type"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                />
                <Input
                    style={{marginTop: 10}}
                    placeholder="Price"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                />

                <div className="addcart-btn mt-4">
                  <button
                      className="btn btn-success m-r-10"
                      type="button"
                      onClick={() => createChoise()}
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
