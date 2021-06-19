import React, { useState, useEffect } from "react";
import {useHistory, useLocation} from "react-router-dom";

import { Accordion } from "react-bootstrap";
import axios from "../../request/request";
import Modal from "react-responsive-modal";
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

  const [categories, setCategories] = useState([]);
  const [couponeCode, setCouponeCode] = useState("");
  const [description, setDescription] = useState("");

  const [mass, setMass] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const [categoryId, setCategoryId] = useState('');

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [openCreateChoise, setOpenCreateChoise] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const [order, setOrder] = useState(null);
  const getOrders = () => {
    return axios({
      method: "get",
      url: "/order",
    })
        .then((response) => {
          setOrder(response && response.data);
          setLoading(false);
        })
        .catch((error) => {
          setMessage("Oops! Can not connect to the database. Try again.");
        });
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setLoading(true);
    getOrders()

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
                  {order?.length > 0 ? (
                    <Table>
                      <thead>
                        <tr>
                          <th>#</th>

                          <th>User info</th>

                          <th>Price</th>
                          <th>Delivery time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.map((item, dx) => (
                            <>
                          <tr key={item._id}>
                            <td> {++dx} </td>
                            <td onClick={()=>history.push(`/products/${item._id}`)}> <div>Name : {item.user.name} </div>
                              <div>Phone: {item.user.phone} </div>
                               <h5 style={{marginTop: 10}}>Address:</h5>
                                <div>
                                  <div>Сity: {item.address.city}</div>
                                  <div>Street: {item.address.street}</div>
                                  <div>House: {item.address.house}</div>
                                  <div>Entrance: {item.address.entrance}</div>
                                  <div> Apartment: {item.address.apartment}</div>

                                  <div> Comment: {item.address.comment}</div>

                                </div>
                            </td>

                            <th>{item.price}</th>
                            <th><div>Day: {item?.delivery_time?.day}</div>
                              <div>Time: {item?.delivery_time?.time}</div></th>

                          </tr>
                          <div>{item?.products.map((item)=>{
                          return  <div style={{
                            background: '#F3F3F3',
                            borderRadius: 12,
                            padding: '5px 5px 5px 15px',
                            marginBottom: 10
                          }}>
                            <div style={{display: 'flex', alignItems: 'center'}}><div >Products:</div> <b style={{fontSize: 16}}>{item.choise.type}</b></div>

                            <div style={{display: 'flex', alignItems: 'center'}}><div >Ingredients:</div>{item.ingredients.map((item)=>{
                              return <span> {item.name},</span>
                            })}</div>

                          </div>
                        })}</div>
                            </>
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
                    onClick={() => {
                    }}
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
                      onClick={() => {

                      }}
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
