import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";

import {Accordion} from "react-bootstrap";
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


    const [open, setOpen] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [index, setIndex] = useState(0);
    const [message, setMessage] = useState(null);


    const [ingredients, setIngredients] = useState([]);

    const [name, setName] = useState([]);
    const [price, setPrice] = useState([]);
    useEffect(() => {
        getIngredients()
    }, [])
    const getIngredients = () => {
        return axios({
            method: "get",
            url: `/products/ingredients`,
        })
            .then((response) => {
                console.log(response)
                setIngredients(response && response.data);

            })
            .catch((error) => {
                setMessage("Oops! Can not connect to the database. Try again.");
            });
    };

    const createIngredient = (status) => {
        setOpen(false);
        setMessage("Updating order status ...");

        axios({
            method: "post",
            url: `/products/ingredients`,
            data: {
                name: name,
                price: price
            },
        })
            .then((response) => {
                console.log(response);
                setMessage("Coupon created successfully");
                getIngredients();
            })
            .catch((error) => {
                console.log(error);
                setMessage("Oops! Error occured. Try again.");
            });

        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    const deleteIngredient = ({ingredientId}) => {
        axios({
            method: "delete",
            url: `/products/ingredients`,
            data: {
                ingredientId: ingredientId
            },
        })
            .then(() => {
                getIngredients();
            })
            .catch((error) => {
            });
    };


    const onOpenModal = (orderId, id) => {
        setOpen(true);
        setOrderId(orderId);
        setIndex(id);
    };

    const onCloseModal = () => {
        setOpen(false);
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
                                    <h5> Ingredients </h5>
                                    <Button onClick={onOpenModal}>Add ingredient</Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="default-according" id="accordionclose">
                                    {ingredients.length > 0 ? (
                                        <Table>
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Ingredient name</th>

                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {ingredients.map((item, dx) => (
                                                <tr key={item._id}>
                                                    <td> {++dx} </td>
                                                    <td> {item.name} </td>

                                                    <td>
                                                        <Button onClick={() => {
                                                            deleteIngredient(item._id)
                                                        }}>
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
                                <h4 className="mt-3">Add ingredient</h4>
                                <Input
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
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
                                        onClick={() => createIngredient()}
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

                <Notification message={message} visibility={message}/>
            </Row>
        </div>
    );
};

export default Dashboard;
